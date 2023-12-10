<script setup lang="ts">
import LearnBar from '~/components/learn/LearnBar.vue'

const settings = useSettings().settings
</script>

<template>
  <div class="w-full h-[calc(100dvh)] bg-gray-50 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
    <div class="flex flex-col w-full h-full">
      <LearnBar class="h-10" />

      <div class="flex flex-row flex-grow">
        <div class="relative flex flex-1">
          <slot />
        </div>
      </div>
    </div>

    <UNotifications />
  </div>
</template>

<style>
html {
  overflow: hidden !important;
}
</style>
