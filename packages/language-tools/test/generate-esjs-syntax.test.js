import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import '../src/index.js';

function readFile(path) {
  return fs.readFileSync(path, 'utf-8');
}

describe('@es-js/language-tools', () => {
  const TEST_FILES = {
    reservedWords: './dist/reserved-words.md',
    esjsSnippets: './dist/esjs.code-snippets.json',
    esjsConfig: './dist/esjs-language-configuration.json',
    esjsSyntax: './dist/esjs.tmLanguage.json',
    esvueConfig: './dist/esvue-language-configuration.json',
    esvueSyntax: './dist/esvue.tmLanguage.json'
  };
  const testFile = (description, filePath) => {
    it(`generates the correct ${description}`, () => {
      const content = readFile(filePath);
      expect(content).toMatchSnapshot();
    });
  };
  testFile('reserved words table', TEST_FILES.reservedWords);
  testFile('esjs code snippets', TEST_FILES.esjsSnippets);
  testFile('esjs language configuration', TEST_FILES.esjsConfig);
  testFile('esjs syntax', TEST_FILES.esjsSyntax);
  testFile('esvue language configuration', TEST_FILES.esvueConfig);
  testFile('esvue syntax', TEST_FILES.esvueSyntax);
});;
