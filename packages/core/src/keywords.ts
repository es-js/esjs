export const vueRef = new Map([
  ['valor', 'value'],
])

export const arrayMethods = new Map([
  ['posicion', 'at'],
  ['concatenar', 'concat'],
  ['copiarDentro', 'copyWithin'],
  ['entradas', 'entries'],
  ['cada', 'every'],
  ['llenar', 'fill'],
  ['filtrar', 'filter'],
  ['buscar', 'find'],
  ['buscarIndice', 'findIndex'],
  ['buscarUltimo', 'findLast'],
  ['buscarUltimoIndice', 'findLastIndex'],
  ['plano', 'flat'],
  ['planoMapeo', 'flatMap'],
  ['paraCada', 'forEach'],
  ['grupo', 'group'],
  ['grupoAMapeo', 'groupToMap'],
  ['incluye', 'includes'],
  ['indiceDe', 'indexOf'],
  ['juntar', 'join'],
  ['claves', 'keys'],
  ['ultimoIndiceDe', 'lastIndexOf'],
  ['mapeo', 'map'],
  ['sacar', 'pop'],
  ['agregar', 'push'],
  ['reducir', 'reduce'],
  ['reducirDerecha', 'reduceRight'],
  ['reverso', 'reverse'],
  ['sacarPrimero', 'shift'],
  ['rodaja', 'slice'],
  ['algun', 'some'],
  ['ordenar', 'sort'],
  ['empalmar', 'splice'],
  ['aCadenaLocalizada', 'toLocaleString'],
  ['aCadena', 'toString'],
  ['agregarInicio', 'unshift'],
  ['valores', 'values'],
])

export const keywordControl = new Map([
  ['capturar', 'catch'],
  ['caso', 'case'],
  ['con', 'with'],
  ['continuar', 'continue'],
  ['crear', 'new'],
  ['desde', 'from'],
  ['elegir', 'switch'],
  ['esperar', 'await'],
  ['exportar', 'export'],
  ['hacer', 'do'],
  ['importar', 'import'],
  ['mientras', 'while'],
  ['para', 'for'],
  ['retornar', 'return'],
  ['sino', 'else'],
  ['osi', 'else if'],
  ['si', 'if'],
  ['constructor', 'constructor'],
  ['eliminar', 'delete'],
  ['extiende', 'extends'],
  ['finalmente', 'finally'],
  ['instanciaDe', 'instanceof'],
  ['intentar', 'try'],
  ['lanzar', 'throw'],
  ['longitud', 'length'],
  ['romper', 'break'],
  ['simbolo', 'symbol'],
  ['subcadena', 'substr'],
  ['tipoDe', 'typeof'],
  ['vacio', 'void'],
  ['yield', 'yield'],
])

export const constantLanguage = new Map([
  ['falso', 'false'],
  ['nulo', 'null'],
  ['verdadero', 'true'],
  ['indefinido', 'undefined'],
]);

export const variableLanguage = new Map([
  ['este', 'this'],
  ['super', 'super'],
]);

export const storageType = new Map([
  ['async', 'async'],
  ['clase', 'class'],
  ['const', 'const'],
  ['global', 'var'],
  ['var', 'let'],
  ['porDefecto', 'default'],
  ['obtener', 'get'],
  ['establecer', 'set'],
  ['funcion', 'function'],
]);

export const metaVariable = new Map([
  ['de', 'of'],
  ['en', 'in'],
]);

export const supportFunction = new Map([
  ['Fecha', 'Date'],
  ['NeN', 'isNaN'],
  ['depurador', 'debugger'],
  ['establecerTemporizador', 'setTimeout'],
]);

// export const keywordsControl = new Map([]);

export const keywords = new Map([
  ...keywordControl,
  ...constantLanguage,
  ...variableLanguage,
  ...storageType,
  ...metaVariable,
  ...supportFunction,

  ...arrayMethods,
  ...vueRef,
])
