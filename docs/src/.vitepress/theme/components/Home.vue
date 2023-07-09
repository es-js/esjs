<script setup lang="ts">

</script>

<template>
  <div>
    <section class="w-full max-w-7xl mx-auto px-10 xl:px-4 space-y-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 grid-reverse">
        <div class="order-2 sm:order-1 flex flex-col justify-center px-4 space-y-8">
          <h1 class="tagline">
            <span class="accent">EsJS</span>
            <br />
            JavaScript con sintaxis en Español
          </h1>

          <div class="flex <md:flex-col space-y-2 space-x-0 md:flex-row md:space-y-0 md:space-x-2">
            <a class="action primary" href="/guia/empezando">
              Empezar
            </a>
            <a class="action" href="https://github.com/es-js/esjs" target="_blank" rel="noopener noreferrer">Ver en GitHub</a>
          </div>
        </div>

        <div class="order-1 sm:order-2 flex flex-col justify-center items-center py-8">
          <img src="/assets/logo.png" alt="EsJS" class="w-full max-w-[160px] sm:max-w-[320px]" />
        </div>
      </div>

      <div class="features grid grid-cols-3">
        <div class="feature">
          <h1>Sintaxis en Español</h1>
          <p>EsJS es ideal para personas hispanohablantes que quieren comenzar a programar, ya que las instrucciones están escritas en Español</p>
        </div>

        <div class="feature">
          <h1>Multiplataforma</h1>
          <p>EsJS puede ser utilizado tanto del lado del Servidor como del Cliente, gracias a su conversión a JavaScript</p>
        </div>

        <div class="feature">
          <h1>JavaScript</h1>
          <p>EsJS aprovecha todo el potencial de JavaScript, uno de los lenguajes de programación más utilizados en el mundo</p>
        </div>
      </div>
    </section>

    <div class="w-full h-8" />

    <ClientOnly>
      <div class="w-full max-w-7xl mx-auto px-4 2xl:px-0">
        <EmbedPlayground src="https://editor.esjs.dev/?code=PTAEBEFMDcFdIDbUqWA7AhqAthgLgE4CWAXqAMYD2aoClAzqDQA7HaQENMBf7njAExQIs9DkRRDQAMSIAjahnLkiAOgBQAM3QrqoMcUiyFmZUQAUaAJSgA3utD6ioS6AC8H0AEYb9x44JIPEoCTAJQAG0ABgBdB1AAX3V46Axwgwl3SKiAGm84+OY0rHNU8Oc3UAAmAG5QZwAeJjqiAGpW33jHDMgIohisnr7QAFp80Fb9cV6iEaq4xyT4wODQtKnDdSWqNHpKEVVIenJiOSICc3iAcgAZLi8o0FYiPi40Xg4uKRFQAGVp0BSYyKMz6agALiueVUMJ6wNMKnMDys6hR6iAA?tests=A4JwrgpgRghgzgCgN4CgAEaDkBGADG0ASwFsIQB7ONAOwC-SK5MAuNAMzGoGNDzq0EASjSoMGGG0IhiMEAEkA5mBgAbCInRiMAbVwAaNNgNG0AJgMBmAwFYDADmNWzJiwBYAuns1a4ZQhAAxQig%2BGC4eBDxBbzRojABfFHjooA&layout=horizontal&hidePreview=true&hideEditor=false&hideConsole=false&hideTests=false&hideOptions=true" show-open-button height="40em" />
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.tagline {
  @apply text-2xl md:text-3xl xl:text-5xl text-center sm:text-left;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0px auto;
}

br {
  display: block;
  content: "";
  margin-top: 10px;
}

.accent {
  @apply text-6xl xl:text-7xl;
}

html:not(.dark) .accent,
.dark .tagline {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


.action {
  @apply px-4 xl:px-5 py-2 xl:py-2.5 inline-block text-center text-gray-900 font-bold rounded-3xl bg-gray-100 border border-gray-300;
}
.action.primary {
  border-color: var(--vp-c-brand-dark);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-c-brand);
}

.dark .action.primary {
  border-color: var(--vp-c-brand);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-c-brand-darker);
}

.features {
  @apply grid grid-cols-1 md:grid-cols-3 gap-4;
}

.feature {
  @apply flex flex-col py-6 px-6 space-y-2 bg-gray-50 dark:bg-gray-800 rounded-xl;
}
.feature h1 {
  @apply text-xl font-bold;
}
.feature p {
  @apply text-gray-700 dark:text-gray-200;
}
</style>
