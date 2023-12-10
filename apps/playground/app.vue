<script setup lang="ts">
import 'splitpanes/dist/splitpanes.css'
import '~/styles/splitpanes.css'
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>

<style>
html {
  overflow: hidden !important;
}
</style>
