```esjs
importar { tiza } desde "@es-js/tiza"
importar snarkdown desde "https://cdn.jsdelivr.net/npm/snarkdown@2.0.0/+esm"

const API_URL = "https://esjs-mendable-api.vercel.app/api/v1"

const modoOscuro = document.documentElement.classList.contains("dark")

funcion configurarColores() {
  Terminal.configurarColorFrente(modoOscuro ? "#4ade80" : "#15803d")
  Terminal.establecerVariableCss("--respuesta-color", modoOscuro ? "#fff" : "#000")
}

funcion mensajeInicial() {
  Terminal.escribir(`<div style="color: var(--respuesta-color); text-align: center; padding: 0 0.5rem;">*******
<a href="https://esjs.dev/" target="_blank">${tiza.morado900.fondoMorado50(
    " EsJS "
  )}</a>
JavaScript con sintaxis en Español
*******

Escribe <strong>hola</strong> para comenzar una conversación sobre EsJS con un asistente virtual potenciado por Inteligencia Artificial generada por <a href="https://mendable.ai/?utm_source=esjs.dev" target="_blank">${tiza.azul900.fondoAzul50(
    " Mendable "
  )}</a>.
</div>
`)
}

asincrono funcion preguntarUsuario() {
  retornar esperar Terminal.leerCadena(`┌[usuario@esjs] \n └$ `)
}

funcion responderUsuario(respuesta) {
  Terminal.escribir(`<div style="color: var(--respuesta-color);">
┌[asistente@esjs]\n└$ ${respuesta}

<div style="text-align: center">*******</div></div>`)
}

funcion responderCargando(texto = "Cargando...") {
  Terminal.escribirSinSalto(`<div style="color: var(--respuesta-color);"><span class="cargando"></span> ${texto}</div>`)
}

asincrono funcion iniciar() {
  configurarColores()

  mensajeInicial()

  var respuesta = esperar preguntarUsuario()
  mientras (respuesta.aMinusculas() !== "hola") {
    const mensajeError =
      "No entendí. Por favor, escribe <strong>hola</strong> para comenzar una conversación."
    responderUsuario(
      modoOscuro ? tiza.rojo400(mensajeError) : tiza.rojo700(mensajeError)
    )

    respuesta = esperar preguntarUsuario()
  }
  
  responderCargando()

  const conversacionId = esperar nuevaConversacion()

  Terminal.limpiarUltimaLinea()

  responderUsuario(
    "¡Hola! Soy un asistente virtual que te ayudará a aprender sobre EsJS. Puedes preguntarme cualquier cosa sobre EsJS, o puedes escribir <strong>chau</strong> para terminar la conversación."
  )

  interactuar(conversacionId)
}

asincrono funcion interactuar(conversacionId) {
  const pregunta = esperar preguntarUsuario()

  si (pregunta.aMinusculas() === "chau") {
    terminarConversacion(conversacionId)
    responderUsuario("¡Chau! Espero haberte ayudado.")

    Terminal.escribir(
      Terminal.centrar(
        tiza.negro.fondoBlanco(
          "Presiona ENTER para comenzar una nueva conversación."
        )
      )
    )
    esperar Terminal.leerEnter()

    Terminal.limpiar()

    retornar iniciar()
  }

  responderCargando('Pensando...')

  const respuesta = esperar chat(conversacionId, pregunta)

  responderUsuario(snarkdown(respuesta))

  interactuar(conversacionId)
}

asincrono funcion nuevaConversacion() {
  intentar {
    const respuesta = esperar fetch(`${API_URL}/conversacion`, {
      method: "POST",
    })

    retornar (esperar respuesta.json()).conversacionId
  } capturar (error) {
    retornar tiza.rojo(
      "Lo siento, no pude conectarme con el servidor. Por favor, intenta de nuevo."
    )
  }
}

asincrono funcion chat(conversacionId, pregunta) {
  intentar {
    const respuesta = esperar fetch(`${API_URL}/conversacion/${conversacionId}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pregunta,
      }),
    })

    Terminal.limpiarUltimaLinea()

    retornar (esperar respuesta.json()).respuesta
  } capturar (error) {
    retornar tiza.rojo(
      "Lo siento, no pude conectarme con el servidor. Por favor, intenta de nuevo."
    )
  }
}

asincrono funcion terminarConversacion(conversacionId) {
  fetch(`${API_URL}/conversacion/${conversacionId}`, {
    method: "DELETE",
  })
}

iniciar()
```
