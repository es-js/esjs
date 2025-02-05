import { getToEsJS } from '../utils'
import { invertMap } from '../../utils'

export const report = () => 'Converts prop types to JavaScript';

export const types = new Map<string, string>([
  ['Numero', 'Number'],
  ['Cadena', 'String'],
  ['Booleano', 'Boolean'],
  ['Objeto', 'Object'],
  ['Arreglo', 'Array'],
  ['Matriz', 'Array'],
  ['Funcion', 'Function'],
  ['Simbolo', 'Symbol'],
  ['Fecha', 'Date'],
  ['Error', 'Error'],
  ['ExpReg', 'RegExp'],
  ['Mapa', 'Map'],
  ['Conjunto', 'Set'],
  ['Apoderado', 'Proxy'],
  ['EnteroGrande', 'BigInt'],
  ['Documento', 'Document']
]);

export function traverse () {
  return {
    ObjectProperty (path: any) {
      const { node } = path;
      if (isIdentifier(node.value)) {
        const typeName = node.value.name;

        const toEsJS = getToEsJS();
        const dictionary = toEsJS ? invertMap(types) : types;

        if (dictionary.has(typeName)) {
          node.value = identifier(dictionary.get(typeName)!);
        }
      }
    }
  };
}

function isIdentifier (node: any, opts?: any): node is any {
  if (!node) {
    return false;
  }

  return node.type === 'Identifier';
}

function identifier (name: string) {
  return {
    type: 'Identifier',
    name
  };
}

