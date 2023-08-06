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

Terminal.escribir(tiza.negrita("Hola mundo desde EsJS"))
```

</InlinePlayground>

### opaco

Escribe un mensaje en la terminal opaco.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.opaco("Hola mundo desde EsJS"))
```

</InlinePlayground>

### cursiva

Escribe un mensaje en la terminal en cursiva.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.cursiva("Hola mundo desde EsJS"))
```

</InlinePlayground>

### subrayado

Escribe un mensaje en la terminal subrayado.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.subrayado("Hola mundo desde EsJS"))
```

</InlinePlayground>

### tachado

Escribe un mensaje en la terminal tachado.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.tachado("Hola mundo desde EsJS"))
```

</InlinePlayground>

### invertido

Escribe un mensaje en la terminal con el color de fondo y el color de texto invertidos.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(tiza.invertido("Hola mundo desde EsJS"))
```

</InlinePlayground>

## Funciones de color

Las funciones de color permiten aplicar colores al texto o al fondo del texto. Los colores disponibles son los mismos que los de la paleta de colores de [Tailwind CSS](https://tailwindcss.com/docs/customizing-colors#color-palette-reference).

### Color de texto (frente)

| Color | | | | | | | | | | |
| - | - | - | - | - | - | - | - | - | - | - |
| negro | 
| blanco |
| rojo | rojo50 | rojo100 | rojo200 | rojo300 | rojo400 | rojo500 | rojo600 | rojo700 | rojo800 | rojo900 |
| verde | verde50 | verde100 | verde200 | verde300 | verde400 | verde500 | verde600 | verde700 | verde800 | verde900 |
| amarillo | amarillo50 | amarillo100 | amarillo200 | amarillo300 | amarillo400 | amarillo500 | amarillo600 | amarillo700 | amarillo800 | amarillo900 |
| azul | azul50 | azul100 | azul200 | azul300 | azul400 | azul500 | azul600 | azul700 | azul800 | azul900 |
| magenta | magenta50 | magenta100 | magenta200 | magenta300 | magenta400 | magenta500 | magenta600 | magenta700 | magenta800 | magenta900 |
| cian | cian50 | cian100 | cian200 | cian300 | cian400 | cian500 | cian600 | cian700 | cian800 | cian900 |
| gris | gris50 | gris100 | gris200 | gris300 | gris400 | gris500 | gris600 | gris700 | gris800 | gris900 |
| indigo | indigo50 | indigo100 | indigo200 | indigo300 | indigo400 | indigo500 | indigo600 | indigo700 | indigo800 | indigo900 |
| morado | morado50 | morado100 | morado200 | morado300 | morado400 | morado500 | morado600 | morado700 | morado800 | morado900 |

### Color de fondo

| Color         | | | | | | | | | | |
|---------------| - | - | - | - | - | - | - | - | - | - |
| fondoNegro |
| fondoBlanco |
| fondoRojo     | fondoRojo50 | fondoRojo100 | fondoRojo200 | fondoRojo300 | fondoRojo400 | fondoRojo500 | fondoRojo600 | fondoRojo700 | fondoRojo800 | fondoRojo900 |
| fondoVerde    | fondoVerde50 | fondoVerde100 | fondoVerde200 | fondoVerde300 | fondoVerde400 | fondoVerde500 | fondoVerde600 | fondoVerde700 | fondoVerde800 | fondoVerde900 |
| fondoAmarillo | fondoAmarillo50 | fondoAmarillo100 | fondoAmarillo200 | fondoAmarillo300 | fondoAmarillo400 | fondoAmarillo500 | fondoAmarillo600 | fondoAmarillo700 | fondoAmarillo800 | fondoAmarillo900 |
| fondoAzul     | fondoAzul50 | fondoAzul100 | fondoAzul200 | fondoAzul300 | fondoAzul400 | fondoAzul500 | fondoAzul600 | fondoAzul700 | fondoAzul800 | fondoAzul900 |
| fondoMagenta  | fondoMagenta50 | fondoMagenta100 | fondoMagenta200 | fondoMagenta300 | fondoMagenta400 | fondoMagenta500 | fondoMagenta600 | fondoMagenta700 | fondoMagenta800 | fondoMagenta900 |
| fondoCian     | fondoCian50 | fondoCian100 | fondoCian200 | fondoCian300 | fondoCian400 | fondoCian500 | fondoCian600 | fondoCian700 | fondoCian800 | fondoCian900 |
| fondoGris     | fondoGris50 | fondoGris100 | fondoGris200 | fondoGris300 | fondoGris400 | fondoGris500 | fondoGris600 | fondoGris700 | fondoGris800 | fondoGris900 |
| fondoIndigo   | fondoIndigo50 | fondoIndigo100 | fondoIndigo200 | fondoIndigo300 | fondoIndigo400 | fondoIndigo500 | fondoIndigo600 | fondoIndigo700 | fondoIndigo800 | fondoIndigo900 |
| fondoMorado   | fondoMorado50 | fondoMorado100 | fondoMorado200 | fondoMorado300 | fondoMorado400 | fondoMorado500 | fondoMorado600 | fondoMorado700 | fondoMorado800 | fondoMorado900 |

<InlinePlayground only-playground hide-preview="false" hide-console="true">

```esjs
importar { tiza } desde "@es-js/tiza"
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(
    tiza.fondoNegro.blanco("Hola mundo desde EsJS"),
    tiza.fondoBlanco.negro("Hola mundo desde EsJS"),
    tiza.fondoRojo50.rojo800("Hola mundo desde EsJS"),
    tiza.fondoVerde50.verde800("Hola mundo desde EsJS"),
    tiza.fondoAmarillo50.amarillo800("Hola mundo desde EsJS"),
    tiza.fondoAzul50.azul800("Hola mundo desde EsJS"),
    tiza.fondoMagenta50.magenta800("Hola mundo desde EsJS"),
    tiza.fondoCian50.cian800("Hola mundo desde EsJS"),
    tiza.fondoGris50.gris800("Hola mundo desde EsJS"),
    tiza.fondoIndigo50.indigo800("Hola mundo desde EsJS"),
    tiza.fondoMorado50.morado800("Hola mundo desde EsJS"),
)
```

</InlinePlayground>


