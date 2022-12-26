<script setup lang="ts">
import EsTerminal from './components/EsTerminal.vue'
import {usarTerminal} from "./main";
import {onMounted} from "vue";

const terminal = usarTerminal();

onMounted(async () => {
  terminal.escribir('Ingresa tu nombre:');

  const nombre = await terminal.leer();

  terminal.escribir(`¡Hola ${nombre}!`);
})
</script>

<template>
  <EsTerminal />
</template>

