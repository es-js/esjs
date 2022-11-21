<script setup lang="ts">
import Playground from '@/components/Playground.vue'
</script>

<template>
  <v-app>
    <v-app-bar app flat height="46">
      <AppBar />
    </v-app-bar>

    <v-main>
      <Playground />
    </v-main>
  </v-app>
</template>
