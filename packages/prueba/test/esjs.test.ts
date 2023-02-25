import { describe, expect, it } from 'vitest'
import {
  afirmar,
  afirmarIguales,
  afirmarMatricesIguales, afirmarMatricesSimilares,
  afirmarObjetosIguales, afirmarObjetosSimilares,
  afirmarSimilares, obtenerResumen,
  prueba,
  pruebas,
} from '../lib/main'

describe('afirmar', () => {
  it('can assert basic value', () => {
    expect(
      () => afirmar(true, 'true is true'),
    ).not.toThrowError()
  })

  it('fails if cant assert basic value', () => {
    expect(
      () => afirmar(false, 'it is not true'),
    ).toThrowError()
  })
})

describe('afirmarIguales', () => {
  it('can assert basic value', () => {
    expect(
      () => afirmarIguales(1, 1),
    ).not.toThrowError()
  })

  it('fails if cant assert basic value', () => {
    expect(
      () => afirmarIguales(1, 2),
    ).toThrowError()

    expect(
      () => afirmarIguales(1, '1'),
    ).toThrowError()

    expect(
      () => afirmarIguales(1, true),
    ).toThrowError()
  })
})

describe('afirmarSimilares', () => {
  it('can assert basic value', () => {
    expect(
      () => afirmarSimilares(1, 1),
    ).not.toThrowError()

    expect(
      () => afirmarSimilares(1, '1'),
    ).not.toThrowError()

    expect(
      () => afirmarSimilares(1, true),
    ).not.toThrowError()
  })

  it('fails if cant assert basic value', () => {
    expect(
      () => afirmarSimilares(1, 2),
    ).toThrowError()

    expect(
      () => afirmarSimilares(1, '2'),
    ).toThrowError()

    expect(
      () => afirmarSimilares(1, false),
    ).toThrowError()
  })
})

describe('afirmarMatricesIguales', () => {
  it('can assert basic array', () => {
    expect(
      () => afirmarMatricesIguales([1, 2, 3], [1, 2, 3]),
    ).not.toThrowError()
  })

  it('fails if cant assert basic array', () => {
    expect(
      () => afirmarMatricesIguales([1, 3, 2], [1, 2, 3]),
    ).toThrowError()
  })

  it('can assert complex array', () => {
    expect(
      () => afirmarMatricesIguales([[1, 2], [3, 4]], [[1, 2], [3, 4]]),
    ).not.toThrowError()
  })

  it('fails if cant assert complex array', () => {
    expect(
      () => afirmarMatricesIguales([[1, 2], [3, 4]], [[1, 2], [3, 5]]),
    ).toThrowError()
  })
})

describe('afirmarObjetosIguales', () => {
  it('can assert basic object', () => {
    expect(
      () => afirmarObjetosIguales({ a: 1, b: 2 }, { a: 1, b: 2 }),
    ).not.toThrowError()
  })

  it('fails if cant assert basic object', () => {
    expect(
      () => afirmarObjetosIguales({ a: 1, b: 2 }, { a: 1, b: 3 }),
    ).toThrowError()
  })

  it('can assert complex object', () => {
    expect(
      () => afirmarObjetosIguales({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }),
    ).not.toThrowError()
  })

  it('fails if cant assert complex object', () => {
    expect(
      () => afirmarObjetosIguales({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }),
    ).toThrowError()
  })
})

describe('afirmarMatricesSimilares', () => {
  it('can assert basic array', () => {
    expect(
      () => afirmarMatricesSimilares([1, 2, 3], [1, 2, 3]),
    ).not.toThrowError()

    expect(
      () => afirmarMatricesSimilares([1, 2, 3], [1, 3, 2]),
    ).not.toThrowError()
  })

  it('fails if cant assert basic array', () => {
    expect(
      () => afirmarMatricesSimilares([1, 2, 3], [1, 2, '3']),
    ).toThrowError()
  })

  it('can assert complex array', () => {
    expect(
      () => afirmarMatricesSimilares([[1, 2], [3, 4]], [[2, 1], [4, 3]]),
    ).not.toThrowError()
  })

  it('fails if cant assert complex array', () => {
    expect(
      () => afirmarMatricesSimilares([[1, 2], [3, 4]], [[2, 1], [4, '3']]),
    ).toThrowError()
  })
})

describe('afirmarObjetosSimilares', () => {
  it('can assert basic object', () => {
    expect(
      () => afirmarObjetosSimilares({ a: 1, b: 2 }, { a: 1, b: 2 }),
    ).not.toThrowError()

    expect(
      () => afirmarObjetosSimilares({ a: 1, b: 2 }, { b: 2, a: 1 }),
    ).not.toThrowError()
  })

  it('fails if cant assert basic object', () => {
    expect(
      () => afirmarObjetosSimilares({ a: 1, b: 2 }, { a: 1, b: '2' }),
    ).toThrowError()
  })

  it('can assert complex object', () => {
    expect(
      () => afirmarObjetosSimilares({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 }),
    ).not.toThrowError()
  })

  it('fails if cant assert complex object', () => {
    expect(
      () => afirmarObjetosSimilares({ a: 1, b: { c: 2 } }, { b: { c: '2' }, a: 1 }),
    ).toThrowError()
  })
})

describe('prueba', () => {
  it('can run prueba', () => {
    expect(
      () => prueba('basica', () => {
        afirmar(true)
        afirmarSimilares(1, '1')
        afirmarIguales(2, 2)
      }),
    ).not.toThrowError()

    expect(
      () => prueba('falla afirmar', () => {
        afirmar(false)
      }),
    ).toThrowError()

    expect(
      () => prueba('falla afirmarIguales', () => {
        afirmarSimilares(true, false)
      }),
    ).toThrowError()

    expect(
      () => prueba('falla afirmarIguales', () => {
        afirmarIguales(1, '1')
      }),
    ).toThrowError()
  })
})

describe('pruebas', () => {
  it('can run pruebas', () => {
    expect(
      () => pruebas({
        basica() {
          afirmar(true)
          afirmarSimilares(1, '1')
          afirmarIguales(2, 2)
        },
      }),
    ).not.toThrowError()

    expect(
      () => pruebas({
        'falla afirmar': function () {
          afirmar(false)
        },
        'falla afirmarSimilares': function () {
          afirmarSimilares(true, false)
        },
        'falla afirmarIguales': function () {
          afirmarIguales(1, '1')
        },
      }),
    ).toThrowError()
  })
})

describe('obtenerResumen', () => {
  it('works for 1 test', () => {
    expect(
      obtenerResumen(
        obtenerResultado({
          basica: () => {
            afirmar(true)
          },
        }, 0),
      ),
    ).toEqual('Se ejecutó 1 prueba: \n 1 exitosa \n 0 fallidas')
  })

  it('works for many tests', () => {
    expect(
      obtenerResumen(
        obtenerResultado({
          basica: () => {
            afirmar(true)
          },
          falla: () => {
            afirmar(false)
          },
        }, 1),
      ),
    ).toEqual('Se ejecutaron 2 pruebas: \n 1 exitosa \n 1 fallida')

    expect(
      obtenerResumen(
        obtenerResultado({
          basica: () => {
            afirmar(true)
          },
          basica2: () => {
            afirmar(true)
          },
          basica3: () => {
            afirmar(true)
          },
        }, 0),
      ),
    ).toEqual('Se ejecutaron 3 pruebas: \n 3 exitosas \n 0 fallidas')
  })
})

describe('obtenerResultado', () => {
  it('works for 1 test', () => {
    expect(
      obtenerResultado({
        basica: () => {
          afirmar(true)
        },
      }, 0),
    ).toEqual({
      numeroPruebas: 1,
      exitosas: 1,
      fallidas: 0,
    })
  })

  it('works for many tests', () => {
    expect(
      obtenerResultado({
        basica: () => {
          afirmar(true)
        },
        falla: () => {
          afirmar(false)
        },
      }, 1),
    ).toEqual({
      numeroPruebas: 2,
      exitosas: 1,
      fallidas: 1,
    })

    expect(
      obtenerResultado({
        basica: () => {
          afirmar(true)
        },
        basica2: () => {
          afirmar(true)
        },
        basica3: () => {
          afirmar(true)
        },
      }, 0),
    ).toEqual({
      numeroPruebas: 3,
      exitosas: 3,
      fallidas: 0,
    })
  })
})
