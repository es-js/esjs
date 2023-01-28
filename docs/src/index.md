---
layout: home
title: EsJS
titleTemplate: JavaScript con sintaxis en Español
sidebar: false

hero:
  name: EsJS
  text: JavaScript con sintaxis en Español
  image: /assets/logo.png
  actions:
    - theme: brand
      text: Empezar
      link: /guia/empezando
    - theme: alt
      text: Ver en GitHub
      link: https://github.com/es-js/esjs
  
features:
    - title: 'Sintaxis en Español'
      details: 'EsJS es ideal para personas hispanohablantes que quieren comenzar a programar, ya que las instrucciones están escritas en Español'
    - title: 'Multiplataforma'
      details: 'EsJS puede ser utilizado tanto del lado del Servidor como del Cliente, gracias a su conversión a JavaScript'
    - title: 'JavaScript'
      details: 'EsJS aprovecha todo el potencial de JavaScript, uno de los lenguajes de programación más utilizados en el mundo'
---

<div class="w-full h-8" />




<div class="w-full max-w-7xl mx-auto px-4 2xl:px-0">

<InlinePlayground only-playground layout="horizontal">

```esjs
// Muestra los 10 primeros números de 
// la serie de Fibonacci.

fibonacci(10)

funcion fibonacci(n) {
  var a = 0
  consola.escribir(a)

  var b = 1
  consola.escribir(b)

  var contador = 2
  
  mientras (contador < n) {
    var c = a + b
    consola.escribir(c)
    a = b
    b = c
    contador++
  }
}
```

</InlinePlayground>

</div>
