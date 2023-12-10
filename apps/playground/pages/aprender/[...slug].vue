<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'

definePageMeta({
  layout: 'learn',
})
</script>

<template>
  <div class="w-full h-full flex flex-row">
    <Splitpanes
      class="default-theme"
    >
      <Pane
        size="30%"
        min-size="20%"
        max-size="80%"
      >
        <article class="prose p-6">
          <ContentDoc />
        </article>
      </Pane>

      <Pane>
        <div class="w-full h-full relative flex flex-col flex-1">
          <PlaygroundShell />
        </div>
      </Pane>
    </Splitpanes>
  </div>
</template>
