---
layout: home
title: EsJS
titleTemplate: Lenguaje de programación con sintaxis en Español basado en JavaScript
sidebar: false
---

<script setup>
import Home from '@theme/components/Home.vue';
import SectionCodeExample from '@theme/components/SectionCodeExample.vue';
</script>

<Home />

<div class="max-w-7xl mx-auto px-3">

<div class="w-full h-20"></div>

<SectionCodeExample title="Crea y ejecuta algoritmos en Español" description="Escribe código en Español y ejecútalo en JavaScript." hide-console="false" hide-preview="true">

<!--@include: ./codigos/fibonacci.md -->

</SectionCodeExample>

<div class="w-full h-20"></div>

<SectionCodeExample title="Aprovecha la potencia de JavaScript" description="EsJS está basado en JavaScript, por lo que puedes utilizar todas las librerías y frameworks que ya conoces." hide-console="true" hide-preview="false" play-height="30rem">

<!--@include: ./codigos/calculadora.md -->

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
<a href="https://editor.esjs.dev" target="_blank" class="action primary">Abrir EsJS Editor</a>
</div>

</div>
