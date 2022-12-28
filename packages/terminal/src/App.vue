<script setup lang="ts">
import { usarTerminal } from "./main";
import { onMounted } from "vue";
import EsTerminal from "./components/EsTerminal.vue";

const Terminal = usarTerminal();

onMounted(async () => {
  Terminal.escribir('Ingresa tu nombre:');

  const nombre = await Terminal.leer();

  Terminal.escribir(`¡Hola ${nombre}!`);
})
</script>

<template>
  <es-terminal></es-terminal>
</template>

