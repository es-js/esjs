# Tiza

El paquete `@es-js/tiza` provee funciones para formatear texto en la terminal. Las distintas funciones se pueden combinar para darle formato y color a un texto.

## Funciones de formateo

Las funciones de formateo se utilizan para darle formato a un texto.

### negrita

Escribe un mensaje en la terminal en negrita.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.negrita("Hola mundo"))
```

</InlinePlayground>

### opaco

Escribe un mensaje en la terminal opaco.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.opaco("Hola mundo"))
```

</InlinePlayground>

### cursiva

Escribe un mensaje en la terminal en cursiva.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.cursiva("Hola mundo"))
```

</InlinePlayground>

### subrayado

Escribe un mensaje en la terminal subrayado.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.subrayado("Hola mundo"))
```

</InlinePlayground>

### sobrelinea

Escribe un mensaje en la terminal sobrelineado.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.sobrelinea("Hola mundo"))
```

</InlinePlayground>

### tachado

Escribe un mensaje en la terminal tachado.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.tachado("Hola mundo"))
```

</InlinePlayground>

### invertido

Escribe un mensaje en la terminal con el color de fondo y el color de texto invertidos.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.invertido("Hola mundo"))
```

</InlinePlayground>

### invisible

Escribe un mensaje en la terminal invisible.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.invisible("Hola mundo"))
```

</InlinePlayground>

### visible

Escribe un mensaje en la terminal visible.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.visible("Hola mundo"))
```

</InlinePlayground>

### limpiar

Limpia el formato de un texto.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.limpiar("Hola mundo"))
```

</InlinePlayground>

## Funciones de color

Las funciones de color permiten aplicar colores al texto o al fondo del texto. Cada función de color tiene una versión que aplica el color de forma brillante.

| Color de texto | Color de texto brillante | Color de fondo | Color de fondo brillante |
| - | - | - | - |
| `negro` | `negroBrillo` | `fondoNegro` | `fondoNegroBrillo` |
| `rojo` | `rojoBrillo` | `fondoRojo` | `fondoRojoBrillo` |
| `verde` | `verdeBrillo` | `fondoVerde` | `fondoVerdeBrillo` |
| `amarillo` | `amarilloBrillo` | `fondoAmarillo` | `fondoAmarilloBrillo` |
| `azul` | `azulBrillo` | `fondoAzul` | `fondoAzulBrillo` |
| `magenta` | `magentaBrillo` | `fondoMagenta` | `fondoMagentaBrillo` |
| `cian` | `cianBrillo` | `fondoCian` | `fondoCianBrillo` |
| `blanco` | `blancoBrillo` | `fondoBlanco` | `fondoBlancoBrillo` |

<InlinePlayground only-playground hide-preview="false" hide-console="true">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(
    tiza.fondoMagenta(
        tiza.blanco("Hola mundo")
    )
)
```

</InlinePlayground>


