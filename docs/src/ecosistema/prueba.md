# Prueba

El paquete `@es-js/prueba` provee funciones para realizar pruebas unitarias.

## Funciones de prueba

Las funciones de prueba se utilizan para ejecutar código y verificar que el resultado sea el esperado.

### prueba

Ejecuta una prueba unitaria.

<InlinePlayground>

```esjs
importar { prueba } desde "@es-js/prueba"

prueba("Nombre de mi prueba", funcion () {
    // Código de mi prueba
})
```

</InlinePlayground>

### pruebas

Ejecuta varias pruebas unitarias.

<InlinePlayground>

```esjs
importar { pruebas } desde "@es-js/prueba"

pruebas({
    "Nombre de mi prueba 1": funcion () {
        // Código de mi prueba 1
    },
    "Nombre de mi prueba 2": funcion() {
        // Código de mi prueba 2
    }
})
```

</InlinePlayground>

## Funciones de aserción

Las funciones de aserción se utilizan para verificar que una condición se cumpla. Si la condición no se cumple, la prueba falla.

### afirmar

Afirma que una expresión es verdadera.

<InlinePlayground>

```esjs
importar { afirmar, prueba } desde "@es-js/prueba"

prueba("1 + 1 es igual a 2", funcion () {
    afirmar(1 + 1 === 2)
})
```

</InlinePlayground>

### afirmarIguales

Afirma que dos valores son iguales.

<InlinePlayground>

```esjs
importar { afirmarIguales, prueba } desde "@es-js/prueba"

prueba("1 + 1 es igual a 2", funcion () {
    afirmarIguales(1 + 1, 2)
})
```

</InlinePlayground>

### afirmarDistinto

Afirma que dos valores son distintos.

<InlinePlayground>

```esjs
importar { afirmarDistinto, prueba } desde "@es-js/prueba"

prueba("1 + 1 no es igual a 3", funcion () {
    afirmarDistinto(1 + 1, 3)
})
```

</InlinePlayground>

### afirmarSimilares

Afirma que dos valores son similares (es decir, que son iguales pero no necesariamente del mismo tipo).

<InlinePlayground>

```esjs
importar { afirmarSimilares, prueba } desde "@es-js/prueba"

prueba("1 + 1 es igual a 2", funcion () {
    afirmarSimilares(1 + 1, "2")
})
```

</InlinePlayground>

### afirmarVerdadero

Afirma que una expresión es verdadera.

<InlinePlayground>

```esjs
importar { afirmarVerdadero, prueba } desde "@es-js/prueba"

prueba("1 + 1 es igual a 2", funcion () {
    afirmarVerdadero(1 + 1 === 2)
})
```

</InlinePlayground>

### afirmarFalso

Afirma que una expresión es falsa.

<InlinePlayground>

```esjs
importar { afirmarFalso, prueba } desde "@es-js/prueba"

prueba("1 + 1 no es igual a 3", funcion () {
    afirmarFalso(1 + 1 === 3)
})
```

</InlinePlayground>


## Funciones de prueba asincrónicas

Las funciones de prueba asincrónicas se utilizan para realizar pruebas unitarias que involucran código asincrónico.

### pruebaAsincrona

Ejecuta una prueba unitaria asincrónica.

<InlinePlayground>

```esjs
importar { pruebaAsincrona } desde "@es-js/prueba"

pruebaAsincrona("Nombre de mi prueba asincrónica", asincrono funcion () {
    // Código de mi prueba asincrónica
})
```

</InlinePlayground>

### pruebasAsincronas

Ejecuta varias pruebas unitarias asincrónicas.

<InlinePlayground>

```esjs
importar { pruebasAsincronas } desde "@es-js/prueba"

pruebasAsincronas({
    "Nombre de mi prueba asincrónica 1": asincrono funcion () {
        // Código de mi prueba asincrónica 1
    },
    "Nombre de mi prueba asincrónica 2": asincrono funcion() {
        // Código de mi prueba asincrónica 2
    }
})
```

</InlinePlayground>
