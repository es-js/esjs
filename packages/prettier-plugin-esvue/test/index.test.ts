import { format } from 'prettier'
import { describe, expect, it } from 'vitest'

describe('prettier-plugin-esvue', () => {
  it('formats EsVue code', async () => {
    const code = `<codigo configuracion="">
  importar { ref } desde 'vue'

const mensaje =   ref('Hola mundo!')
</codigo>

<plantilla>
        <t1>{{ mensaje }}</t1>
  <entrada v-model="mensaje">
</plantilla>
`

    const expected = `<codigo configuracion="">
importar { ref } desde "vue"

const mensaje = ref("Hola mundo!")
</codigo>

<plantilla>
  <t1>{{ mensaje }}</t1>
  <entrada v-model="mensaje">
</plantilla>
`

    expect(
      await format(code, {
        plugins: ['./dist/index.cjs'],
        filepath: 'fuente/indice.esvue',
        parser: 'esvue',
      }),
    ).toBe(expected)
  })

  it('formats EsVue code without configuration', async () => {
    const code = `<codigo>
  importar { ref } desde 'vue'

  const mensaje = ref('Hola mundo!')
</codigo>

<plantilla>
  <t1>{{ mensaje }}</t1>
  <entrada v-model="mensaje">
</plantilla>
`

    const expected = `<codigo>
importar { ref } desde "vue"

const mensaje = ref("Hola mundo!")
</codigo>

<plantilla>
  <t1>{{ mensaje }}</t1>
  <entrada v-model="mensaje">
</plantilla>
`

    expect(
      await format(code, {
        plugins: ['./dist/index.cjs'],
        filepath: 'fuente/indice.esvue',
        parser: 'esvue',
      }),
    ).toBe(expected)
  })
})
