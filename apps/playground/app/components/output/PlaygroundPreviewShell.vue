<script setup lang="ts">
import { useSettings } from '~/composables/useSettings'

defineEmits<{ refresh: [] }>()

const settings = useSettings()
const settingsStore = settings.settings
</script>

<template>
  <AppContainer class="w-full h-full">
    <template #title>
      <div v-if="!settingsStore.embed" class="flex flex-row items-center">
        <AppButton
          description="Refrescar"
          icon="i-mdi-refresh"
          variant="ghost"
          size="2xs"
          @click="$emit('refresh')"
        />

        <AppButton
          :icon="settingsStore.hidePreview ? 'i-mdi-eye-off' : 'i-mdi-eye'"
          :description="settingsStore.hidePreview ? 'Mostrar vista previa' : 'Ocultar vista previa'"
          variant="ghost"
          @click="settings.setHidePreview(!settingsStore.hidePreview)"
        />

        <div class="flex flex-grow px-2">
          <span class="h-5 flex flex-grow flex-row justify-center items-center text-center text-xs px-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full">
            Resultado
          </span>
        </div>

        <slot name="actions" />
      </div>
    </template>

    <slot />
  </AppContainer>
</template>
