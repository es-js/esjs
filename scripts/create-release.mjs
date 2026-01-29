#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

function loadEnv() {
  const envPath = join(rootDir, '.env');
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eq = trimmed.indexOf('=');
      if (eq > 0) {
        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!(key in process.env)) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnv();

const GITHUB_REPO = process.env.GITHUB_REPO || 'es-js/esjs';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

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
    const pkgJson = JSON.parse(readFileSync(join(rootDir, pkgPath, 'package.json'), 'utf-8'));
    return pkgJson.name;
  } catch {
    return null;
  }
}

function getPackageVersion(pkgPath) {
  try {
    const pkgJson = JSON.parse(readFileSync(join(rootDir, pkgPath, 'package.json'), 'utf-8'));
    return pkgJson.version;
  } catch {
    return null;
  }
}

function getCommitMessage(commit) {
  return exec(`git log -1 --format=%s ${commit}`);
}

function getCommitAuthor(commit) {
  return exec(`git log -1 --format=%an ${commit}`);
}

function getCommitEmail(commit) {
  return exec(`git log -1 --format=%ae ${commit}`);
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

function normalizeAuthor(author, email) {
  if (!author) return null;
  
  if (!email) {
    const normalized = author.toLowerCase().trim();
    return normalized.replace(/\s+/g, '') || author;
  }
  
  const normalizedEmail = email.toLowerCase().trim();
  const normalized = author.toLowerCase().trim().replace(/\s+/g, '');
  
  return normalized || author;
}

function formatReleaseNotes(commits, packageName, pkgPath) {
  const notes = {
    features: [],
    fixes: [],
    breaking: [],
    other: []
  };

  const authors = new Set();
  const emailToAuthor = new Map();

  for (const commit of commits) {
    const message = getCommitMessage(commit);
    const authorRaw = getCommitAuthor(commit);
    const email = getCommitEmail(commit);
    
    let author = authorRaw;
    if (email) {
      const normalizedEmail = email.toLowerCase().trim();
      if (emailToAuthor.has(normalizedEmail)) {
        author = emailToAuthor.get(normalizedEmail);
      } else {
        const normalized = normalizeAuthor(authorRaw, email);
        emailToAuthor.set(normalizedEmail, normalized);
        author = normalized;
      }
    } else {
      author = normalizeAuthor(authorRaw, null);
    }
    
    if (author) authors.add(author);

    const parsed = parseConventionalCommit(message);

    if (parsed.type === 'chore') {
      continue;
    }

    const filesChanged = exec(`git diff --name-only ${commit}^..${commit} -- ${pkgPath}/`);
    if (!filesChanged || filesChanged.trim().length === 0) {
      continue;
    }

    const packageFiles = filesChanged.split('\n').filter(file => {
      return file.startsWith(pkgPath + '/') &&
             !file.startsWith(pkgPath + '/test/') &&
             !file.includes('/package.json') &&
             !file.includes('/pnpm-lock.yaml');
    });

    if (packageFiles.length === 0) {
      continue;
    }

    const displayAuthor = author || 'unknown';
    const entry = `- ${parsed.description} (@${displayAuthor})`;

    if (parsed.breaking) {
      notes.breaking.push(entry);
    } else if (parsed.type === 'feat' || parsed.type === 'nueva' || parsed.type === 'caracteristica') {
      notes.features.push(entry);
    } else if (parsed.type === 'fix' || parsed.type === 'correccion' || parsed.type === 'arreglo') {
      notes.fixes.push(entry);
    } else if (parsed.type === 'change' || parsed.type === 'style' || parsed.type === 'docs' || parsed.type === 'refactor') {
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
    const sortedAuthors = Array.from(authors).sort();
    releaseNotes += sortedAuthors.map(a => `- ${a}`).join('\n');
  }

  return releaseNotes.trim();
}

async function getLastReleaseCommit(packageName) {
  const releases = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=100`,
    {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    }
  ).then(r => r.json()).catch(() => []);

  const tagPrefix = packageName.replace(/[\/@]/g, '-') + '@';
  const lastRelease = releases.find(r => r.tag_name.startsWith(tagPrefix));

  if (lastRelease) {
    return lastRelease.target_commitish || null;
  }

  return null;
}

function getPackages() {
  const packages = [];
  const packagesDir = join(rootDir, 'packages');
  const dirs = exec(`ls -d ${packagesDir}/*/`).split('\n').filter(Boolean);

  for (const dir of dirs) {
    let pkgPath = dir.replace(rootDir + '/', '').replace(/\/+$/, '');
    const pkgName = getPackageName(pkgPath);
    if (pkgName && !pkgName.includes('prueba')) {
      packages.push({ path: pkgPath, name: pkgName });
    }
  }

  return packages;
}

function question(rl, query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function selectPackage(packages, packageArg) {
  if (packageArg) {
    const pkg = packages.find(p =>
      p.name === packageArg ||
      p.name.includes(packageArg) ||
      p.path.includes(packageArg)
    );
    if (pkg) {
      return pkg;
    }
    console.error(`❌ Package "${packageArg}" no encontrado`);
  }

  console.log('\n📦 Packages disponibles:\n');
  packages.forEach((pkg, index) => {
    const version = getPackageVersion(pkg.path);
    console.log(`  ${index + 1}. ${pkg.name} (v${version})`);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const answer = await question(rl, '\nSelecciona un package (número o nombre): ');
  rl.close();

  const num = parseInt(answer);
  if (!isNaN(num) && num > 0 && num <= packages.length) {
    return packages[num - 1];
  }

  const pkg = packages.find(p =>
    p.name === answer ||
    p.name.includes(answer) ||
    p.path.includes(answer)
  );

  return pkg || null;
}

async function confirmRelease(rl, releaseNotes) {
  console.log('\n' + '='.repeat(80));
  console.log('📝 Preview de la Release:');
  console.log('='.repeat(80) + '\n');
  console.log(releaseNotes);
  console.log('\n' + '='.repeat(80) + '\n');

  const answer = await question(rl, '¿Crear esta release en GitHub? (s/n): ');
  return answer.toLowerCase() === 's' || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'si';
}

async function createGitHubRelease(packageName, version, releaseNotes, commit) {
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
      console.log(`\n✅ Release creada exitosamente: ${releaseName}`);
      console.log(`   URL: ${data.html_url}`);
      return data;
    } else {
      const error = await response.text();
      if (response.status === 422 && error.includes('already exists')) {
        console.log(`\n⏭️  Release ya existe: ${releaseName}`);
        return null;
      }
      console.error(`\n❌ Error creando release ${releaseName}:`, error);
      return null;
    }
  } catch (error) {
    console.error(`\n❌ Error creando release ${releaseName}:`, error.message);
    return null;
  }
}

async function main() {
  const packageArg = process.argv[2];
  const packages = getPackages();

  if (packages.length === 0) {
    console.error('❌ No se encontraron packages');
    process.exit(1);
  }

  const selectedPackage = await selectPackage(packages, packageArg);

  if (!selectedPackage) {
    console.error('❌ Package no válido');
    process.exit(1);
  }

  const currentVersion = getPackageVersion(selectedPackage.path);
  const currentCommit = exec('git rev-parse HEAD');

  console.log(`\n📦 Package seleccionado: ${selectedPackage.name}`);
  console.log(`   Versión actual: ${currentVersion}`);
  console.log(`   Commit actual: ${currentCommit.substring(0, 7)}`);

  const lastReleaseCommit = await getLastReleaseCommit(selectedPackage.name);

  let commits = [];
  let lastReleaseCommitLocal = null;

  if (lastReleaseCommit) {
    lastReleaseCommitLocal = lastReleaseCommit;
  } else {
    const releaseCommits = exec(`git log --grep="release" --format=%H -- ${selectedPackage.path}/package.json`)?.split('\n').filter(Boolean) || [];
    if (releaseCommits.length > 0) {
      lastReleaseCommitLocal = releaseCommits[releaseCommits.length - 1];
    }
  }

  function getCommitsAffectingPackage(fromCommit, toCommit, pkgPath) {
    const allCommits = exec(`git log --reverse --format=%H ${fromCommit}..${toCommit}`)
      ?.split('\n').filter(Boolean) || [];

    const filteredCommits = [];
    for (const commit of allCommits) {
      const filesChanged = exec(`git diff --name-only ${commit}^..${commit} -- ${pkgPath}/`);
      if (filesChanged && filesChanged.trim().length > 0) {
        const files = filesChanged.split('\n').filter(Boolean);
        const packageFiles = files.filter(file => file.startsWith(pkgPath + '/'));
        if (packageFiles.length > 0) {
          filteredCommits.push(commit);
        }
      }
    }

    return filteredCommits;
  }

  if (lastReleaseCommitLocal) {
    const allCommits = getCommitsAffectingPackage(lastReleaseCommitLocal, currentCommit, selectedPackage.path);

    const releaseCommitsInRange = exec(`git log --reverse --grep="release" --format=%H ${lastReleaseCommitLocal}..${currentCommit} -- ${selectedPackage.path}/package.json`)
      ?.split('\n').filter(Boolean) || [];

    if (releaseCommitsInRange.length > 0) {
      const lastReleaseCommitInRange = releaseCommitsInRange[releaseCommitsInRange.length - 1];
      const lastReleaseIndex = allCommits.indexOf(lastReleaseCommitInRange);
      if (lastReleaseIndex >= 0) {
        commits = allCommits.slice(0, lastReleaseIndex);
        console.log(`   Último release commit: ${lastReleaseCommitLocal.substring(0, 7)}`);
        console.log(`   Deteniendo en commit de release: ${lastReleaseCommitInRange.substring(0, 7)}`);
        console.log(`   Commits desde último release: ${commits.length}`);
      } else {
        commits = allCommits;
        console.log(`   Último release commit: ${lastReleaseCommitLocal.substring(0, 7)}`);
        console.log(`   Commits desde último release: ${commits.length}`);
      }
    } else {
      commits = allCommits;
      console.log(`   Último release commit: ${lastReleaseCommitLocal.substring(0, 7)}`);
      console.log(`   Commits desde último release: ${commits.length}`);
    }
  } else {
    const rangeStart = exec(`git rev-parse HEAD~100`);
    const allCommits = getCommitsAffectingPackage(rangeStart, currentCommit, selectedPackage.path);

    const releaseCommitsInRange = exec(`git log --reverse --grep="release" --format=%H ${rangeStart}..${currentCommit} -- ${selectedPackage.path}/package.json`)
      ?.split('\n').filter(Boolean) || [];

    if (releaseCommitsInRange.length > 0) {
      const lastReleaseCommitInRange = releaseCommitsInRange[releaseCommitsInRange.length - 1];
      const lastReleaseIndex = allCommits.indexOf(lastReleaseCommitInRange);
      if (lastReleaseIndex >= 0) {
        commits = allCommits.slice(0, lastReleaseIndex);
        console.log(`   No se encontró release previo, deteniendo en commit de release: ${lastReleaseCommitInRange.substring(0, 7)}`);
        console.log(`   Commits considerados: ${commits.length}`);
      } else {
        commits = allCommits;
        console.log(`   No se encontró release previo, usando últimos 100 commits`);
      }
    } else {
      commits = allCommits;
      console.log(`   No se encontró release previo, usando últimos 100 commits`);
    }
  }

  if (commits.length === 0) {
    console.log('\n⚠️  No se encontraron commits nuevos para esta release');
    process.exit(0);
  }

  const releaseNotes = formatReleaseNotes(commits, selectedPackage.name, selectedPackage.path);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const confirmed = await confirmRelease(rl, releaseNotes);
  rl.close();

  if (!confirmed) {
    console.log('\n❌ Release cancelada');
    process.exit(0);
  }

  await createGitHubRelease(
    selectedPackage.name,
    currentVersion,
    releaseNotes,
    currentCommit
  );
}

main().catch(console.error);
