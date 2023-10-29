import { format } from 'prettier'
import { describe, expect, it } from 'vitest'

describe('should', () => {
  it('format', async () => {
    expect(
      await format(`
funcion inicio() {
si (Mate.aleatorio() < 0.5) {
retornar "Hola mundo"
} sino {
retornar "Hola mundo!"
}
}`, {
        plugins: ['./dist/index.cjs'],
        filepath: 'prueba/codigo.esjs',
        parser: 'esjs',
      }),
    ).toBe(`funcion inicio() {
  si (Mate.aleatorio() < 0.5) {
    retornar "Hola mundo";
  } sino {
    retornar "Hola mundo!";
  }
}
`)
  })

  it('format2', async () => {
    expect(
      await format(`function inicio() {
  if (Math.random() < 0.5) {
    return "Hola mundo";
  } else {
    return "Hola mundo!";
  }
}
`, {
        plugins: ['./dist/index.cjs'],
        filepath: 'prueba/codigo.esjs',
        parser: 'esjs',
      }),
    ).toBe(`funcion inicio() {
  si (Mate.aleatorio() < 0.5) {
    retornar "Hola mundo";
  } sino {
    retornar "Hola mundo!";
  }
}
`)
  })
})
