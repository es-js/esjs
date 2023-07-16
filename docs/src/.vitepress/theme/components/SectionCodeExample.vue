<script setup lang="ts">
import { useCode } from '@es-js/docs-components'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

const codeSlot: Ref<null | HTMLElement> = ref(null)

const openUrl = computed(
  () => {
    const code = useCode().getCodeFromCodeBlock(codeSlot.value)

    if (!code)
      return ''

    return useCode().getEditorUrl(code)
  },
)
</script>

<template>
  <h1 class="my-3 text-4xl font-bold text-center">
    <slot name="title" />
  </h1>

  <p v-if="$slots.description" class="text-center text-gray-500 dark:text-gray-400 mb-4">
    <slot name="description" />
  </p>

  <div class="vp-doc grid grid-cols-1 md:grid-cols-2">
    <div ref="codeSlot" class="flex flex-col justify-center">
      <slot name="code" />
    </div>

    <div class="flex flex-col justify-center">
      <div class="-mt-[16px] md:mt-0 mx-4 md:mx-0 bg-gray-100 dark:bg-gray-800 rounded-b-lg md:rounded-b-0 md:rounded-r-lg p-4">
        <EsEjecutar hide-preview height="300px">
          <slot name="code" />
        </EsEjecutar>
      </div>
    </div>
  </div>

  <a :href="openUrl" target="_blank" class="text-center block mt-1">
    <span class="inline-block bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg px-4 py-2">
      Abrir ejemplo en EsJS Editor
    </span>
  </a>
</template>

<style scoped>

</style>
