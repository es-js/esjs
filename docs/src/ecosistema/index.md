# Ecosistema EsJS

El lenguaje EsJS está compuesto por un conjunto de librerías que se pueden utilizar de forma independiente o combinadas entre sí. Cada librería tiene una funcionalidad específica y se puede utilizar en cualquier proyecto que utilice EsJS/JavaScript.

## Prueba

Prueba es una librería que permite escribir pruebas unitarias que se ejecutan en un navegador web.

<InlinePlayground only-playground>

```esjs
importar { afirmar, prueba } desde "@es-js/prueba"

prueba("prueba de ejemplo", funcion () {
  const resultado = 1 + 1
  afirmar(resultado === 2)
})
```

</InlinePlayground>


[Ver más](./prueba)

## Terminal

La Terminal es un componente que permite interactuar con el Usuario a través de la línea de comandos en un navegador web.

<InlinePlayground only-playground hide-console hide-preview="false">

```esjs
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir("Ingresa tu nombre:")
const nombre = esperar Terminal.leer()
Terminal.escribir(`Hola ${nombre}`)
```

</InlinePlayground>

[Ver más](./terminal)

## Tiza

Tiza es una librería que permite escribir mensajes en la Terminal con colores y estilos.

<InlinePlayground only-playground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(
    Terminal.centrar(
        tiza.fondoMagenta(
            tiza.negrita(
                tiza.blanco(
                    tiza.subrayado(
                        "Hola mundo desde EsJS"
                    )
                )
            )
        )
    )
)
```

</InlinePlayground>

[Ver más](./tiza)
