<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'

const editor = useEditor()
</script>

<template>
  <UDropdown
    :items="editor.availableVersions"
    :popper="{ placement: 'bottom-start' }"
  >
    <UButton
      color="gray"
      :label="editor.version.value"
      trailing-icon="i-mdi-chevron-down"
      icon="i-mdi-code-tags"
      size="2xs"
    />
  </UDropdown>
</template>
