# Condición `si` ... `sino` (if ... else)

La estructura de control `si` ejecuta un bloque de código si una condición es verdadera. 

```esjs
si (condicion) {
    // código
}
```

Opcionalmente, puedes usar una cláusula `sino` para ejecutar un bloque de código si la condición es falsa.

```esjs
si (condicion) {
    // código
} sino {
    // código
}
```

## Ejemplo

<InlinePlayground>

```esjs
var edad = 20;

si (edad >= 18) {
    consola.escribir('Mayor de edad');
} sino {
    consola.escribir('Menor de edad');
}
```

</InlinePlayground>
