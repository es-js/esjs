---
layout: home
title: EsJS
titleTemplate: Lenguaje de programación con sintaxis en Español basado en JavaScript
sidebar: false
---

<script setup>
import Home from '@theme/components/Home.vue'
</script>

<Home />

<div class="max-w-7xl mx-auto px-3">

<div class="w-full h-20"></div>

<h1 class="my-3 text-4xl font-bold text-center">Crea y ejecuta algoritmos en Español</h1>

<div class="vp-doc grid grid-cols-1 md:grid-cols-2">

<div class="flex flex-col justify-center">

<!--@include: ./codigos/fibonacci.md -->

</div>

<div class="flex flex-col justify-center">

<div class="-mt-[16px] md:mt-0 mx-4 md:mx-0 bg-gray-100 dark:bg-gray-800 rounded-b-lg md:rounded-b-0 md:rounded-r-lg p-4">

<EsEjecutar hide-preview height="300px">

<!--@include: ./codigos/fibonacci.md -->

</EsEjecutar>

</div>

</div>

</div>

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
