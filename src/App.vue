<script setup lang="ts">
// import Hola from '../examples/Hola.esjs'
import Playground from '@/components/Playground.vue'
</script>

<template>
  <v-app>
    <v-app-bar app flat height="46">
      <AppBar />
    </v-app-bar>

    <v-main>
      <!--      <Hola /> -->
      <Playground />
    </v-main>
  </v-app>
</template>
