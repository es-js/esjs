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
  ['planoMapear', 'flatMap'],
  ['paraCada', 'forEach'],
  ['grupo', 'group'],
  ['grupoAMapear', 'groupToMap'],
  ['incluye', 'includes'],
  ['indiceDe', 'indexOf'],
  ['juntar', 'join'],
  ['claves', 'keys'],
  ['ultimoIndiceDe', 'lastIndexOf'],
  ['mapear', 'map'],
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

export const mathMethods = new Map([
  ['absoluto', 'abs'],
  ['arcocoseno', 'acos'],
  ['arcocosenoHiperbolico', 'acosh'],
  ['arcoseno', 'asin'],
  ['arcosenoHiperbolico', 'asinh'],
  ['arcotangente', 'atan'],
  ['arcotangente2', 'atan2'],
  ['arcotangenteHiperbolica', 'atanh'],
  ['raizCubica', 'cbrt'],
  ['redondearHaciaArriba', 'ceil'],
  ['cerosALaIzquierdaEn32Bits', 'clz32'],
  ['coseno', 'cos'],
  ['cosenoHiperbolico', 'cosh'],
  ['exponencial', 'exp'],
  ['exponencialMenos1', 'expm1'],
  ['redondearHaciaAbajo', 'floor'],
  ['redondearAComaFlotante', 'fround'],
  ['hipotenusa', 'hypot'],
  ['multiplicacionEntera', 'imul'],
  ['logaritmo', 'log'],
  ['logaritmoBase10', 'log10'],
  ['logaritmoDe1Mas', 'log1p'],
  ['logaritmoBase2', 'log2'],
  ['maximo', 'max'],
  ['minimo', 'min'],
  ['potencia', 'pow'],
  ['aleatorio', 'random'],
  ['redondear', 'round'],
  ['signo', 'sign'],
  ['seno', 'sin'],
  ['senoHiperbolico', 'sinh'],
  ['raizCuadrada', 'sqrt'],
  ['tangente', 'tan'],
  ['tangenteHiperbolica', 'tanh'],
  ['truncar', 'trunc'],
])

export const numberMethods = new Map([
  ['esFinito', 'isFinite'],
  ['esEntero', 'isInteger'],
  ['NeN', 'isNaN'],
  ['esEnteroSeguro', 'isSafeInteger'],
  ['interpretarDecimal', 'parseFloat'],
  ['interpretarEntero', 'parseInt'],
  ['aExponencial', 'toExponential'],
  ['fijarDecimales', 'toFixed'],
  ['aCadenaLocalizada', 'toLocaleString'],
  ['aPrecision', 'toPrecision'],
  ['aCadena', 'toString'],
  ['valorDe', 'valueOf'],
])

export const consoleMethods = new Map([
  ['afirmar', 'assert'],
  ['limpiar', 'clear'],
  ['contar', 'count'],
  ['reiniciarContador', 'countReset'],
  ['depurar', 'debug'],
  ['listar', 'dir'],
  ['listarXml', 'dirxml'],
  ['error', 'error'],
  ['agrupar', 'group'],
  ['agruparColapsado', 'groupCollapsed'],
  ['finalizarAgrupacion', 'groupEnd'],
  ['info', 'info'],
  ['escribir', 'log'],
  ['perfil', 'profile'],
  ['finalizarPerfil', 'profileEnd'],
  ['tabla', 'table'],
  ['tiempo', 'time'],
  ['finalizarTiempo', 'timeEnd'],
  ['registrarTiempo', 'timeLog'],
  ['marcaDeTiempo', 'timeStamp'],
  ['rastrear', 'trace'],
  ['advertencia', 'warn'],
])

export const stringMethods = new Map([
  ['enPosicion', 'at'],
  ['caracterEn', 'charAt'],
  ['codigoDeCaracterEn', 'charCodeAt'],
  ['puntoDeCodigoEn', 'codePointAt'],
  ['concatenar', 'concat'],
  ['terminaCon', 'endsWith'],
  ['desdeCodigoDeCaracter', 'fromCharCode'],
  ['desdePuntoDeCodigo', 'fromCodePoint'],
  ['incluye', 'includes'],
  ['indiceDe', 'indexOf'],
  ['ultimoIndiceDe', 'lastIndexOf'],
  ['compararLocalizada', 'localeCompare'],
  ['coincidir', 'match'],
  ['coincidirTodo', 'matchAll'],
  ['normalizar', 'normalize'],
  ['rellenarAlFinal', 'padEnd'],
  ['rellenarAlComienzo', 'padStart'],
  ['crudo', 'raw'],
  ['repetir', 'repeat'],
  ['reemplazar', 'replace'],
  ['reemplazarTodo', 'replaceAll'],
  ['buscar', 'search'],
  ['recortar', 'slice'],
  ['dividir', 'split'],
  ['comienzaCon', 'startsWith'],
  ['subcadena', 'substring'],
  ['aMinusculasLocalizada', 'toLocaleLowerCase'],
  ['aMayusculasLocalizada', 'toLocaleUpperCase'],
  ['aMinusculas', 'toLowerCase'],
  ['aMayusculas', 'toUpperCase'],
  ['aCadena', 'toString'],
  ['recortarEspacios', 'trim'],
  ['recortarEspaciosAlFinal', 'trimEnd'],
  ['recortarEspaciosAlComienzo', 'trimStart'],
  ['valorDe', 'valueOf'],
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
  ['subcad', 'substr'],
  ['tipoDe', 'typeof'],
  ['vacio', 'void'],
  ['producir', 'yield'],

  ...numberMethods,
  ...mathMethods,
  ...consoleMethods,
  ...stringMethods,
])

export const constantLanguage = new Map([
  ['falso', 'false'],
  ['nulo', 'null'],
  ['verdadero', 'true'],
  ['indefinido', 'undefined'],
  ['Infinito', 'Infinity'],
  ['NuN', 'NaN'],
  ['esteGlobal', 'globalThis'],
])

export const variableLanguage = new Map([
  ['este', 'this'],
  ['super', 'super'],
])

export const storageType = new Map([
  ['asincrono', 'async'],
  ['clase', 'class'],
  ['const', 'const'],
  ['global', 'var'],
  ['var', 'let'],
  ['porDefecto', 'default'],
  ['obtener', 'get'],
  ['establecer', 'set'],
  ['funcion', 'function'],
])

export const metaVariable = new Map([
  ['de', 'of'],
  ['en', 'in'],
])

export const supportFunction = new Map([
  ['consola', 'console'],
  ['depurador', 'debugger'],
  ['establecerTemporizador', 'setTimeout'],
  ['establecerIntervalo', 'setInterval'],
  ['Fecha', 'Date'],
  ['Numero', 'Number'],
  ['Mate', 'Math'],
  ['Matriz', 'Array'],
  ['Arreglo', 'Array'],
  ['Booleano', 'Boolean'],
  ['Cadena', 'String'],
  ['Funcion', 'Function'],
  ['Promesa', 'Promise'],
])

export const promiseMethods = new Map([
  ['todos', 'all'],
  ['todosTerminados', 'allSettled'],
  ['cualquiera', 'any'],
  ['capturar', 'catch'],
  ['finalmente', 'finally'],
  ['carrera', 'race'],
  ['rechaza', 'reject'],
  ['resuelve', 'resolve'],
  ['luego', 'then'],
])

export const keywords = new Map([
  ...keywordControl,
  ...constantLanguage,
  ...variableLanguage,
  ...storageType,
  ...metaVariable,
  ...supportFunction,
  ...arrayMethods,
  ...promiseMethods,
  ...vueRef,
])
