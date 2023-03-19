# Comentarios

Los comentarios son una forma de agregar texto a nuestro código para que este sea más fácil de entender. Los comentarios no se ejecutan, por lo que no afectan el funcionamiento del programa.

## Comentarios de una línea

Los comentarios de una línea comienzan con `//` y terminan al final de la línea. Cualquier texto o código que este dentro de estos signos serán ignorados por EsJS (no se ejecutaran).

<InlinePlayground>

```esjs
// La siguiente linea de código escribe en pantalla el texto "Hola Mundo"

consola.escribir("Hola Mundo") // <-- Muestra "Hola Mundo" en la consola
```

</InlinePlayground>


## Comentarios de líneas múltiples

Los comentarios de líneas múltiples comienzan con `/*` y terminan con `*/`. Cualquier texto o código que este dentro de estos signos serán ignorados por EsJS (no se ejecutaran).

<InlinePlayground>

```esjs
/*
    Este comentario de varias lineas se puede usar para explicar
    el funcionamiento de un bloque de código.
*/

consola.escribir("Hola Mundo")
```

</InlinePlayground>
