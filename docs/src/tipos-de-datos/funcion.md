# `funcion` (function)

Una función es un bloque de código que puede ser ejecutado en cualquier momento. En EsJS, las funciones se declaran explícitamente con la palabra clave `funcion`:

```esjs
funcion miFuncion() {
    // código
}
```

## Ejemplo

<InlinePlayground>

```esjs
funcion miFuncion() {
    consola.escribir('Hola mundo');
}

miFuncion();
```

</InlinePlayground>

## Parámetros (arguments)

Una función puede recibir parámetros. Los parámetros son variables que se declaran en la definición de la función y que pueden ser accedidas dentro del cuerpo de la función.

```esjs
funcion miFuncion(parametro1, parametro2) {
    // código
}
```

### Ejemplo

<InlinePlayground>

```esjs
funcion miFuncion(parametro1, parametro2) {
    consola.escribir(parametro1 + parametro2);
}

miFuncion(1, 2);
```

</InlinePlayground>

## Retorno (return)

Una función puede retornar un valor. El valor retornado puede ser asignado a una variable o usado en cualquier otra parte del programa.

```esjs
funcion miFuncion() {
    retornar 1;
}
```

### Ejemplo

<InlinePlayground>

```esjs
funcion miFuncion() {
    retornar 1;
}

var x = miFuncion();
```

</InlinePlayground>

## Funciones anónimas (anonymous functions)

Una función anónima es una función que no tiene nombre. En EsJS, las funciones anónimas se declaran explícitamente con la palabra clave `funcion`:

```esjs
funcion() {
    // código
}
```

### Ejemplo

<InlinePlayground>

```esjs
(funcion() {
    consola.escribir('Hola mundo');
})();
```

</InlinePlayground>

## Funciones flecha (arrow functions)

Una función flecha es una alternativa más corta para declarar funciones anónimas. En EsJS, las funciones flecha se declaran explícitamente usando la sintaxis `=>`:

```esjs
() => {
    // código
}
```

### Ejemplo

<InlinePlayground>

```esjs
(() => {
    consola.escribir('Hola mundo');
})();
```

</InlinePlayground>
