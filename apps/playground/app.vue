<script setup lang="ts">
</script>

<template>
  <div class="w-full h-[calc(100dvh)] bg-gray-50 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
    <div class="flex flex-col w-full h-full">
      <AppBar class="h-10" />

      <div class="flex flex-row flex-grow">
        <div class="relative flex flex-1">
          <NuxtPage />
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
