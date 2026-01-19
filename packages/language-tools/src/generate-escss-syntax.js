import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import {
  getPropertiesDictionary,
  getValuesDictionary,
  getAtRulesDictionary,
  getPseudoClassesDictionary,
  getPseudoElementsDictionary,
} from '@es-js/escss/dictionaries'

/**
 * Get EsCSS keywords from the generated dictionaries.
 * When inverted=true, we get CSS -> EsCSS mapping, so we extract the EsCSS keys (values).
 */
function getEscssKeywords(dictionary) {
  // The dictionary maps EsCSS -> CSS, so the keys are EsCSS keywords
  return Array.from(dictionary.keys())
}

// Get keywords from dictionaries (EsCSS -> CSS direction gives us EsCSS keys)
const escssProperties = getEscssKeywords(getPropertiesDictionary(false))
const escssValues = getEscssKeywords(getValuesDictionary(false))
const escssAtRules = getEscssKeywords(getAtRulesDictionary(false))
const escssPseudoClasses = getEscssKeywords(getPseudoClassesDictionary(false))
const escssPseudoElements = getEscssKeywords(getPseudoElementsDictionary(false))

function includeKeywords(keywords) {
  return `\\\\b(${keywords.join('|')})\\\\b`
}

if (!existsSync('dist')) {
  mkdirSync('dist')
}

// Create a TextMate grammar for EsCSS
const escssGrammar = {
  $schema:
    'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json',
  name: 'EsCSS',
  scopeName: 'source.escss',
  patterns: [
    { include: '#comment' },
    { include: '#at-rule' },
    { include: '#selector' },
    { include: '#rule-list' },
  ],
  repository: {
    comment: {
      patterns: [
        {
          name: 'comment.block.escss',
          begin: '/\\\\*',
          end: '\\\\*/',
        },
      ],
    },
    'at-rule': {
      patterns: [
        {
          name: 'keyword.control.at-rule.escss',
          match: `@(${escssAtRules.join('|')})\\\\b`,
        },
        {
          name: 'keyword.control.at-rule.escss',
          match: '@[a-zA-Z-]+',
        },
      ],
    },
    selector: {
      patterns: [
        {
          name: 'entity.other.attribute-name.class.escss',
          match: '\\\\.[a-zA-Z_][a-zA-Z0-9_-]*',
        },
        {
          name: 'entity.other.attribute-name.id.escss',
          match: '#[a-zA-Z_][a-zA-Z0-9_-]*',
        },
        {
          name: 'entity.name.tag.escss',
          match: '\\\\b[a-zA-Z][a-zA-Z0-9]*\\\\b',
        },
        {
          name: 'entity.other.attribute-name.pseudo-class.escss',
          match: `:(${escssPseudoClasses.join('|')})\\\\b`,
        },
        {
          name: 'entity.other.attribute-name.pseudo-element.escss',
          match: `::(${escssPseudoElements.join('|')})\\\\b`,
        },
      ],
    },
    'rule-list': {
      patterns: [
        {
          begin: '\\\\{',
          end: '\\\\}',
          patterns: [
            { include: '#comment' },
            { include: '#property' },
          ],
        },
      ],
    },
    property: {
      patterns: [
        {
          name: 'support.type.property-name.escss',
          match: `(${escssProperties.join('|')})(?=\\\\s*:)`,
        },
        {
          name: 'support.type.property-name.escss',
          match: '[a-zA-Z-]+(?=\\\\s*:)',
        },
        {
          name: 'support.constant.property-value.escss',
          match: includeKeywords(escssValues),
        },
        {
          name: 'constant.numeric.escss',
          match:
            '-?[0-9]+(\\\\.[0-9]+)?(em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|%)?',
        },
        {
          name: 'support.constant.color.escss',
          match: '#[0-9a-fA-F]{3,8}\\\\b',
        },
        {
          name: 'string.quoted.double.escss',
          begin: '"',
          end: '"',
        },
        {
          name: 'string.quoted.single.escss',
          begin: "'",
          end: "'",
        },
      ],
    },
  },
}

const output = JSON.stringify(escssGrammar, null, '\t')

writeFileSync('dist/escss.tmLanguage.json', output)
