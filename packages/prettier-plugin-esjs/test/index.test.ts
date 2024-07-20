import { format } from 'prettier'
import { describe, expect, it } from 'vitest'

describe('should', () => {
  it('formats function', async () => {
    expect(
      await format(
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
      ),
    ).toBe(`funcion inicio() {
  si (Mate.aleatorio() < 0.5) {
    retornar "Hola mundo";
  } sino {
    retornar "Hola mundo!";
  }
}
`)
  })

  it('formats function with return', async () => {
    expect(
      await format(
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
      ),
    ).toBe(`funcion inicio() {
  si (Mate.aleatorio() < 0.5) {
    retornar "Hola mundo";
  } sino {
    retornar "Hola mundo!";
  }
}
`)
  })

  it('formats code with comments', async () => {
    expect(
      await format(
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
      ),
    ).toBe(`funcion inicio() {
  // Comentario
  si (Mate.aleatorio() < 0.5) {
    retornar "Hola mundo";
  } sino {
    retornar "Hola mundo!";
  }
}
`)
  })

  it('formats code with export default', async () => {
    expect(
      await format(
        `
const app = crear Fecha()

exportar   porDefecto   app
`,
        {
          plugins: ['./dist/index.cjs'],
          filepath: 'prueba/codigo.esjs',
          parser: 'esjs',
        },
      ),
    ).toBe(`const app = crear Fecha();

exportar porDefecto app;
`)
  })
})
