<script setup lang="ts">
import PlaygroundSandbox from '~/components/output/PlaygroundSandbox.vue'
import { useEditor } from '~/composables/app/useEditor'

const editor = useEditor()
</script>

<template>
  <div class="h-full">
    <PlaygroundSandbox
      v-if="editor.loading.value === false"
      class="relative w-full h-full overflow-hidden"
    />

    <div
      v-if="editor.loading.value === true"
      class="w-full h-full flex flex-col justify-center items-center"
    >
      <div class="flex flex-row items-center space-x-2">
        <span class="text-sm font-medium text-gray-900 dark:text-gray-100">Cargando...</span>
      </div>
    </div>
  </div>
</template>
