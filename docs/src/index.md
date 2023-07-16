---
layout: home
title: EsJS
titleTemplate: Lenguaje de programación con sintaxis en Español basado en JavaScript
sidebar: false
---

<script setup>
import Home from '@theme/components/Home.vue'
import SectionCodeExample from '@theme/components/SectionCodeExample.vue'
</script>

<Home />

<div class="max-w-7xl mx-auto px-3">

<div class="w-full h-20"></div>

<SectionCodeExample>

<template #title>

Crea y ejecuta algoritmos en Español

</template>

<template #description>

Escribe código en Español y ejecútalo en JavaScript.

</template>

<template #code>

<!--@include: ./codigos/fibonacci.md -->

</template>

</SectionCodeExample>

<div class="w-full h-20"></div>

<SectionCodeExample>

<template #title>

Aprovecha la potencia de JavaScript

</template>

<template #description>

EsJS está basado en JavaScript, por lo que puedes utilizar todas las librerías y frameworks que ya conoces.

</template>

<template #code>

<!--@include: ./codigos/fibonacci.md -->

</template>

</SectionCodeExample>

<div class="w-full h-20"></div>

<h1 class="my-3 text-4xl font-bold text-center">¿Tienes dudas?</h1>

<p class="text-center">Chatea con un asistente virtual en la siguiente aplicación creada con EsJS en modo Terminal.</p>

<EsEjecutar only-playground hide-preview="false" hide-console="true">

<!--@include: ./codigos/esjs-mendable-app.md -->

</EsEjecutar>

<div class="w-full h-20"></div>

<h1 class="my-3 text-4xl font-bold text-center">Pruébalo ahora en EsJS Editor</h1>

<div class="flex flex-row justify-center">
<a href="https://editor.esjs.dev" target="_blank" class="bg-indigo-600 hover:bg-indigo-400 text-white py-3 px-5 rounded-full"><span class="text-white">Abrir Editor</span></a>
</div>

</div>
