<template>
  <div>
    <section class="w-full max-w-7xl mx-auto px-10 xl:px-4 space-y-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 grid-reverse">
        <div class="order-2 sm:order-1 flex flex-col justify-center px-4 space-y-8">
          <h1 class="tagline">
            <span class="accent">EsJS</span>
            <br>
            JavaScript con sintaxis en Español
          </h1>

          <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-2">
            <a
              href="/guia/empezando"
              title="Empezar a programar con EsJS"
              class="action primary"
            >
              Empezar con EsJS
            </a>
            <a class="action" href="https://github.com/es-js/esjs" target="_blank" rel="noopener noreferrer">Ver en GitHub</a>
          </div>
        </div>

        <div class="order-1 sm:order-2 flex flex-col justify-center items-center py-8">
          <img src="/assets/logo.png" alt="EsJS" class="w-[160px] sm:w-[260px] md:w-[320px]">
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
          <h1>Basado en JavaScript</h1>
          <p>EsJS aprovecha todo el potencial de JavaScript, uno de los lenguajes de programación más utilizados en el mundo</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tagline {
  @apply text-2xl md:text-3xl xl:text-5xl text-center sm:text-left;
  letter-spacing: -1px;
}

br {
  display: block;
  content: "";
  margin-top: 10px;
}

.accent {
  @apply text-6xl md:text-7xl xl:text-8xl font-bold;
  letter-spacing: -1.5px;
}

.features {
  @apply grid grid-cols-1 md:grid-cols-3 gap-4;
}

.feature {
  @apply flex flex-col py-6 px-6 space-y-2
  bg-gray-50 dark:bg-gray-800
  border border-gray-200 dark:border-gray-700
  rounded-xl;
}
.feature h1 {
  @apply text-xl font-bold;
}
.feature p {
  @apply text-gray-700 dark:text-gray-200;
}
</style>
