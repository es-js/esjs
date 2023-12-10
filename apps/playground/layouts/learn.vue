<script setup lang="ts">
import LearnBar from '~/components/learn/LearnBar.vue'
</script>

<template>
  <div class="w-full h-[calc(100dvh)] bg-gray-50 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
    <div class="flex flex-col w-full h-full">
      <LearnBar class="h-10" />

      <slot />
    </div>

    <UNotifications />
  </div>
</template>
