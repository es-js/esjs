<script setup lang="ts">
import { useEditor } from '@/composables/useEditor'

const editor = useEditor()
</script>

<template>
  <div class="w-full h-full grid grid-cols-3">
    <div class="flex flex-row items-center p-2">
      <span class="text-xl">EsJS</span>
    </div>

    <div>
      <v-row no-gutters justify="center" align="center" class="h-full">
        <v-btn
          color="primary"
          variant="flat"
          height="30"
          @click="editor.execute()"
        >
          Ejecutar
        </v-btn>
      </v-row>
    </div>
  </div>
</template>
