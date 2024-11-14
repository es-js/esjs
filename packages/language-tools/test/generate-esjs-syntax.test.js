import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import '../src/index.js';

function readFile(path) {
  return fs.readFileSync(path, 'utf-8');
}

describe('@es-js/language-tools', () => {
  it('generates the correct reserved words table', () => {
    const reservedWords = readFile('./dist/reserved-words.md');
    expect(reservedWords).toMatchSnapshot();
  });

  it('generates the correct esjs code snippets', () => {
    const esjsCodeSnippets = readFile('./dist/esjs.code-snippets.json');
    expect(esjsCodeSnippets).toMatchSnapshot();
  });

  it('generates the correct esjs language configuration', () => {
    const esjsLanguageConfiguration = readFile('./dist/esjs-language-configuration.json');
    expect(esjsLanguageConfiguration).toMatchSnapshot();
  });

  it('generates the correct esjs syntax', () => {
    const esjsTmLanguage = readFile('./dist/esjs.tmLanguage.json');
    expect(esjsTmLanguage).toMatchSnapshot();
  });

  it('generates the correct esvue language configuration', () => {
    const esvueLanguageConfiguration = readFile('./dist/esvue-language-configuration.json');
    expect(esvueLanguageConfiguration).toMatchSnapshot();
  });

  it('generates the correct esvue syntax', () => {
    const esvueTmLanguage = readFile('./dist/esvue.tmLanguage.json');
    expect(esvueTmLanguage).toMatchSnapshot();
  });
});
