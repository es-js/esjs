# Variables

Una variable es un espacio de memoria que almacena un valor. En EsJS, las variables se declaran explícitamente con la palabra clave `var` o `global`:

<InlinePlayground>

```esjs
    var x = 1
    global y = 2
```

</InlinePlayground>

## Variables globales `global`

Las variables globales son variables que pueden ser accedidas desde cualquier parte del programa. Se declaran con la palabra clave `global`:

<InlinePlayground>

```esjs
    global x = 1
```

</InlinePlayground>

## Variables locales `var`

Las variables locales son variables que solo pueden ser accedidas desde el bloque de código donde fueron declaradas. Se declaran con la palabra clave `var`:

<InlinePlayground>

```esjs
    var x = 1
```

</InlinePlayground>
