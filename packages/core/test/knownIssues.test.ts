import { describe, it } from 'vitest'
import { assertCompile, assertEsJSToJS, assertJSToESJS } from './testUtils'

describe('known issues', () => {
  it('fixed: compiles variables named `escribir`', async () => {
    assertCompile(
      `const escribir = 'prueba';\n`,
      `const escribir = 'prueba';\n`,
      {
        compiler: 'essucrase',
      },
    )
  })

  it('fixed: does not compile variables named `get`', async () => {
    assertCompile(
      `mut get = 'prueba';\n`,
      `let get = 'prueba';\n`,
      {
        compiler: 'essucrase',
      },
    )
  })

  it('fixed: transpiles const/mut/var to const/let/var', async () => {
    assertCompile(
      `const desde = 'a';\nvar b = {\n    para: 'para',\n    si: 'si',\n};\n\nmut hasta = 'c';\n`,
      `const desde = 'a';\nvar b = {\n    para: 'para',\n    si: 'si',\n};\n\nlet hasta = 'c';\n`,
      {
        compiler: 'essucrase',
      },
    )
  })

  it('fixed: number methods', async () => {
    assertCompile(
      `consola.escribir(Numero.interpretarDecimal(Mate.aleatorio()));\n\nconst x = Numero.interpretarEntero('123');\n\nconsola.escribir(x.fijarDecimales(2));\n`,
      `console.log(Number.parseFloat(Math.random()));\n\nconst x = Number.parseInt('123');\n\nconsole.log(x.toFixed(2));\n`,
      {
        compiler: 'essucrase',
      },
    )
  })

  it('fixed: Matriz tiene precedencia sobre Arreglo', async () => {
    assertEsJSToJS(
      `const x = Arreglo([])\n      const y = Arreglo(1, 2, 3)\n      const a = Matriz([])\n      const b = Matriz(1, 2, 3)\n      consola.escribir(x)\n    `,
      `const x = Array([]);\nconst y = Array(1, 2, 3);\nconst a = Array([]);\nconst b = Array(1, 2, 3);\n\nconsole.log(x);\n`,
      {
        compiler: 'essucrase',
      },
    )

    assertJSToESJS(
      `const x = Array([]);\nconst y = Array(1, 2, 3);\nconst a = Array([]);\nconst b = Array(1, 2, 3);\n\nconsole.log(x);\n`,
      `const x = Matriz([]);\nconst y = Matriz(1, 2, 3);\nconst a = Matriz([]);\nconst b = Matriz(1, 2, 3);\n\nconsola.escribir(x);\n`,
      {
        compiler: 'essucrase',
      },
    )
  })

  it('convierte tipos de Vue', async () => {
    assertEsJSToJS(
      `const props = {\n        a: Numero,\n        b: Cadena,\n        c: Booleano,\n        d: Objeto,\n        e: Matriz,\n        e2: Arreglo,\n        f: Funcion,\n        g: Simbolo,\n        h: Fecha,\n        i: Error,\n        j: ExpReg,\n        k: Mapa,\n        l: Conjunto,\n      }\n    `,
      `const props = {\n    a: Number,\n    b: String,\n    c: Boolean,\n    d: Object,\n    e: Array,\n    e2: Array,\n    f: Function,\n    g: Symbol,\n    h: Date,\n    i: Error,\n    j: RegExp,\n    k: Map,\n    l: Set,\n};\n`,
      {
        compiler: 'essucrase',
      },
    )

    assertJSToESJS(
      `const props = {\n    a: Number,\n    b: String,\n    c: Boolean,\n    d: Object,\n    e: Array,\n    e2: Array,\n    f: Function,\n    g: Symbol,\n    h: Date,\n    i: Error,\n    j: RegExp,\n    k: Map,\n    l: Set,\n};\n`,
      `const props = {\n    a: Numero,\n    b: Cadena,\n    c: Booleano,\n    d: Objeto,\n    e: Matriz,\n    e2: Matriz,\n    f: Funcion,\n    g: Simbolo,\n    h: Fecha,\n    i: Error,\n    j: ExpReg,\n    k: Mapa,\n    l: Conjunto,\n};\n`,
      {
        compiler: 'essucrase',
      },
    )
  })
})
