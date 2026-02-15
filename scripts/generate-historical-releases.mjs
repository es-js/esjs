#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const GITHUB_REPO = process.env.GITHUB_REPO || 'es-js/esjs';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || null;

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN no está configurado');
  process.exit(1);
}

function exec(command, options = {}) {
  try {
    return execSync(command, {
      encoding: 'utf-8',
      cwd: rootDir,
      stdio: ['pipe', 'pipe', 'ignore'],
      ...options
    }).trim();
  } catch (error) {
    return null;
  }
}

function getPackageName(pkgPath) {
  try {
    const pkgJson = JSON.parse(readFileSync(join(pkgPath, 'package.json'), 'utf-8'));
    return pkgJson.name;
  } catch {
    return null;
  }
}

function fileExistsInCommit(commit, filePath) {
  try {
    const result = execSync(
      `git cat-file -e ${commit}:${filePath}`,
      {
        encoding: 'utf-8',
        cwd: rootDir,
        stdio: ['pipe', 'pipe', 'ignore']
      }
    );
    return true;
  } catch {
    return false;
  }
}

function getPackageVersion(commit, pkgPath) {
  const filePath = `${pkgPath.replace(/\/+$/, '')}/package.json`;

  try {
    const command = `git show ${commit}:${filePath}`;
    const content = exec(command);
    if (!content) {
      return null;
    }
    const pkgJson = JSON.parse(content);
    return pkgJson.version || null;
  } catch (error) {
    return null;
  }
}

function getAllCommits() {
  const commits = exec('git log --reverse --format=%H');
  return commits ? commits.split('\n').filter(Boolean) : [];
}

function getCommitMessage(commit) {
  return exec(`git log -1 --format=%s ${commit}`);
}

function getCommitAuthor(commit) {
  return exec(`git log -1 --format=%an ${commit}`);
}

function getCommitDate(commit) {
  return exec(`git log -1 --format=%ai ${commit}`);
}

function parseConventionalCommit(message) {
  const pattern = /^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/;
  const match = message.match(pattern);

  if (!match) {
    return { type: 'other', scope: null, breaking: false, description: message };
  }

  const [, type, scope, breaking, description] = match;
  return {
    type: type.toLowerCase(),
    scope: scope || null,
    breaking: !!breaking,
    description
  };
}

function formatReleaseNotes(commits, packageName) {
  const notes = {
    features: [],
    fixes: [],
    breaking: [],
    other: []
  };

  const authors = new Set();

  for (const commit of commits) {
    const message = getCommitMessage(commit);
    const author = getCommitAuthor(commit);
    if (author) authors.add(author);

    const parsed = parseConventionalCommit(message);
    const entry = `- ${parsed.description} (@${author || 'unknown'})`;

    if (parsed.breaking) {
      notes.breaking.push(entry);
    } else if (parsed.type === 'feat' || parsed.type === 'nueva' || parsed.type === 'caracteristica') {
      notes.features.push(entry);
    } else if (parsed.type === 'fix' || parsed.type === 'correccion' || parsed.type === 'arreglo') {
      notes.fixes.push(entry);
    } else {
      notes.other.push(entry);
    }
  }

  let releaseNotes = `## Cambios\n\n`;

  if (notes.breaking.length > 0) {
    releaseNotes += `### ⚠️ Cambios que rompen compatibilidad\n\n${notes.breaking.join('\n')}\n\n`;
  }

  if (notes.features.length > 0) {
    releaseNotes += `### ✨ Nuevas características\n\n${notes.features.join('\n')}\n\n`;
  }

  if (notes.fixes.length > 0) {
    releaseNotes += `### 🐛 Correcciones\n\n${notes.fixes.join('\n')}\n\n`;
  }

  if (notes.other.length > 0) {
    releaseNotes += `### 📝 Otros cambios\n\n${notes.other.join('\n')}\n\n`;
  }

  if (authors.size > 0) {
    releaseNotes += `\n### 👥 Contribuidores\n\n`;
    releaseNotes += Array.from(authors).map(a => `- ${a}`).join('\n');
  }

  return releaseNotes.trim();
}

async function createGitHubRelease(packageName, version, releaseNotes, commit, date) {
  const tagName = `${packageName.replace('@', '').replace('/', '-')}@${version}`;
  const releaseName = `${packageName} v${version}`;

  const url = `https://api.github.com/repos/${GITHUB_REPO}/releases`;
  const body = JSON.stringify({
    tag_name: tagName,
    name: releaseName,
    body: releaseNotes,
    target_commitish: commit,
    draft: false,
    prerelease: version.includes('alpha') || version.includes('beta') || version.includes('rc')
  });

  console.log(`\n📝 Creando release: ${releaseName}`);
  console.log(`   Tag: ${tagName}`);
  console.log(`   Commit: ${commit.substring(0, 7)}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Creada release: ${releaseName} (${tagName})`);
      return data;
    } else {
      const error = await response.text();
      if (response.status === 422 && error.includes('already exists')) {
        console.log(`⏭️  Release ya existe: ${releaseName}`);
        return null;
      }
      console.error(`❌ Error creando release ${releaseName}:`, error);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creando release ${releaseName}:`, error.message);
    return null;
  }
}

function getPackages() {
  const packages = [];
  const packagesDir = join(rootDir, 'packages');
  const dirs = exec(`ls -d ${packagesDir}/*/`).split('\n').filter(Boolean);

  for (const dir of dirs) {
    let pkgPath = dir.replace(rootDir + '/', '').replace(/\/+$/, '');
    const fullPath = join(rootDir, pkgPath);
    const pkgName = getPackageName(fullPath);
    if (pkgName && !pkgName.includes('prueba')) {
      packages.push({ path: pkgPath, name: pkgName });
    }
  }

  return packages;
}

async function processPackage(pkg) {
  console.log(`\n📦 Procesando ${pkg.name}...`);

  const filePath = `${pkg.path}/package.json`;

  const commitsWithChanges = exec(`git log --all --reverse --format=%H -- ${filePath}`);

  if (!commitsWithChanges) {
    console.log(`   ⏭️  No se encontraron commits para este package`);
    return;
  }

  const commits = commitsWithChanges.split('\n').filter(Boolean);
  console.log(`   Encontrados ${commits.length} commits que afectan este package`);

  const versionChanges = [];
  let lastVersion = null;
  let versionsSeen = new Set();

  for (const commit of commits) {
    const version = getPackageVersion(commit, pkg.path);

    if (version && version !== lastVersion) {
      if (!versionsSeen.has(version)) {
        versionChanges.push({
          version,
          commit,
          date: getCommitDate(commit)
        });
        versionsSeen.add(version);
        lastVersion = version;
      }
    } else if (version) {
      lastVersion = version;
    }
  }


  if (versionChanges.length === 0) {
    console.log(`   ⏭️  No se encontraron cambios de versión`);
    return;
  }

  console.log(`   Encontradas ${versionChanges.length} versiones`);

  for (let i = 0; i < versionChanges.length; i++) {
    const current = versionChanges[i];
    const previous = i > 0 ? versionChanges[i - 1] : null;

    let versionCommits = [];

    if (previous) {
      const commitsRange = exec(`git log --reverse --format=%H ${previous.commit}^..${current.commit} -- ${pkg.path}`);
      if (commitsRange) {
        versionCommits = commitsRange.split('\n').filter(Boolean);
      }
      if (versionCommits.length === 0) {
        versionCommits = [current.commit];
      }
    } else {
      const firstCommit = exec(`git log --reverse --format=%H --diff-filter=A -- ${filePath} | head -1`);
      if (firstCommit) {
        const commitsRange = exec(`git log --reverse --format=%H ${firstCommit}..${current.commit} -- ${pkg.path}`);
        if (commitsRange) {
          versionCommits = commitsRange.split('\n').filter(Boolean);
        }
      }
      if (versionCommits.length === 0) {
        versionCommits = [current.commit];
      }
    }

    const releaseNotes = formatReleaseNotes(versionCommits, pkg.name);
    await createGitHubRelease(
      pkg.name,
      current.version,
      releaseNotes,
      current.commit,
      current.date
    );

    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function main() {
  console.log('🚀 Generando releases históricas...\n');

  const packages = getPackages();
  console.log(`Encontrados ${packages.length} packages\n`);

  for (const pkg of packages) {
    await processPackage(pkg);
  }

  console.log('\n✨ Proceso completado');
}

main().catch(console.error);
