import { describe, expect, it } from 'vitest'
import { compile } from '../src'

const esvue = `<codigo configuracion="">
importar { ref } desde 'vue'

const mensaje = ref('Hola mundo!')
</codigo>

<plantilla>
  <t1>{{ mensaje }}</t1>
  <entrada v-model="mensaje">
</plantilla>
`

const vue = `<script setup="">
import { ref } from 'vue'

const mensaje = ref('Hola mundo!')
</script>

<template>
  <h1>{{ mensaje }}</h1>
  <input v-model="mensaje">
</template>
`

describe('compile', () => {
  it('esvue to vue', async () => {
    const compiled = compile(esvue)

    expect(compiled).toBe(vue)
  })

  it('vue to esvue', async () => {
    const compiled = compile(vue, { from: 'vue', to: 'esvue' })

    expect(compiled).toBe(esvue)
  })
})

describe('codigo vacio', () => {
  it('esvue to vue', async () => {
    const compiled = compile('<codigo configuracion=""></codigo>')

    expect(compiled).toBe('<script setup=""></script>')
  })

  it('vue to esvue', async () => {
    const compiled = compile('<script setup=""></script>', { from: 'vue', to: 'esvue' })

    expect(compiled).toBe('<codigo configuracion=""></codigo>')
  })
})
