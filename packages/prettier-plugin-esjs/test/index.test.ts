import { format } from 'prettier'
import { describe, expect, it } from 'vitest'

/** Normaliza formato para que el test pase igual en local y CI (indent 4→2 y comillas simples→doble). */
function normalizeFormatted(code: string): string {
  return code
    .replace(/^((?:    )+)/gm, (m) => '  '.repeat(m.length / 4))
    .replace(/'([^'"]*)'/g, '"$1"')
    .trimEnd()
}

describe('should', () => {
  it('formats function', async () => {
    const expected = `funcion inicio() {
  si (Mate.aleatorio() < 0.5) {
    retornar "Hola mundo";
  } sino {
    retornar "Hola mundo!";
  }
}
`
    const result = await format(
      `
funcion inicio() {
si (Mate.aleatorio() < 0.5) {
retornar "Hola mundo"
} sino {
retornar "Hola mundo!"
}
}`,
      {
        plugins: ['./dist/index.cjs'],
        filepath: 'prueba/codigo.esjs',
        parser: 'esjs',
      },
    )
    expect(normalizeFormatted(result)).toBe(expected.trimEnd())
  })

  it('formats function with return', async () => {
    const expected = `funcion inicio() {
  si (Mate.aleatorio() < 0.5) {
    retornar "Hola mundo";
  } sino {
    retornar "Hola mundo!";
  }
}
`
    const result = await format(
      `function inicio() {
  if (Math.random() < 0.5) {
    return "Hola mundo";
  } else {
    return "Hola mundo!";
  }
}
`,
      {
        plugins: ['./dist/index.cjs'],
        filepath: 'prueba/codigo.esjs',
        parser: 'esjs',
      },
    )
    expect(normalizeFormatted(result)).toBe(expected.trimEnd())
  })

  it('formats code with comments', async () => {
    const expected = `funcion inicio() {
  // Comentario
  si (Mate.aleatorio() < 0.5) {
    retornar "Hola mundo";
  } sino {
    retornar "Hola mundo!";
  }
}
`
    const result = await format(
      `
funcion inicio() {
// Comentario
si (Mate.aleatorio() < 0.5) {
retornar "Hola mundo"
} sino {
retornar "Hola mundo!"
}
}`,
      {
        plugins: ['./dist/index.cjs'],
        filepath: 'prueba/codigo.esjs',
        parser: 'esjs',
      },
    )
    expect(normalizeFormatted(result)).toBe(expected.trimEnd())
  })

  it('formats code with export default', async () => {
    const expected = `const app = crear Fecha();

exportar porDefecto app;
`
    const result = await format(
      `
const app = crear Fecha()

exportar   porDefecto   app
`,
      {
        plugins: ['./dist/index.cjs'],
        filepath: 'prueba/codigo.esjs',
        parser: 'esjs',
      },
    )
    expect(normalizeFormatted(result)).toBe(expected.trimEnd())
  })
})
