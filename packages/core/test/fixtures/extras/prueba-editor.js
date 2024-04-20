/**
 EsJS: Lenguaje de programación con sintaxis en español basado en JavaScript.
 */

import { Terminal } from "@es-js/terminal"
import { tiza } from "@es-js/tiza"
import confetti from "npm/canvas-confetti/+esm"

async function principal() {
  Terminal.limpiar()

  Terminal.escribir(
    "¡Hola mundo desde " + tiza.indigo800.fondoIndigo50(" EsJS ") + "!"
  )

  Terminal.escribir(
    "Aprende más sobre EsJS en " +
    Terminal.enlace(
      "https://es.js.org",
      tiza.indigo800.fondoIndigo50(" https://es.js.org ")
    )
  )

  Terminal.escribir("*".repeat(50)) // Separador

  Terminal.escribir(
    "Este es un ejemplo de como usar la Terminal. Selecciona una opcion:"
  )

  Terminal.escribir("1. Tirar papeles")
  Terminal.escribir("2. Tirar fuegos artificiales")

  const opcion = await Terminal.leerNumero()

  if (opcion === 1) {
    tirarPapeles()
  } else if (opcion === 2) {
    tirarFuegosArtificiales()
  }

  principal()
}

function tirarPapeles() {
  console.log("Tirando papeles...")
  confetti()
}

function tirarFuegosArtificiales() {
  const duracion = 15 * 1000 // 15 segundos
  const animacionFin = Date.now() + duracion
  const opcionesPorDefecto = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
  }

  function aleatorioEnRango(minimo, maximo) {
    return Math.random() * (maximo - minimo) + minimo;
  }

  const intervalo = setInterval(function () {
    const tiempoRestante = animacionFin - Date.now()

    console.log("Tiempo restante: " + tiempoRestante / 1000 + " segundos")

    if (tiempoRestante <= 0) {
      console.log("Fin de la animación")
      return clearInterval(intervalo)
    }

    const cantidadParticulas = 50 * (tiempoRestante / duracion)

    confetti({
      ...opcionesPorDefecto,
      particleCount: cantidadParticulas,
      origin: { x: aleatorioEnRango(0.1, 0.3), y: Math.random() - 0.2 },
    })
    confetti({
      ...opcionesPorDefecto,
      particleCount: cantidadParticulas,
      origin: { x: aleatorioEnRango(0.7, 0.9), y: Math.random() - 0.2 },
    })
  }, 250)
}

principal()
