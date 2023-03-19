# Bucle `para` (for loop)

El bucle `para` ejecuta un bloque de código un número específico de veces.

```esjs
para (inicializacion; condicion; expresion) {
    // código
}
```

Comienza ejecutando la expresión de inicialización. Luego, evalúa la condición. Si la condición es verdadera, ejecuta el bloque de código. Después de ejecutar el bloque de código, ejecuta la expresión. Vuelve a evaluar la condición. Si es verdadera, vuelve a ejecutar el bloque de código. Continúa ejecutando el bloque de código hasta que la condición sea falsa.

## Ejemplo

<InlinePlayground>

```esjs
para (var i = 0; i < 5; i = i + 1) {
    consola.escribir(i);
}

```

</InlinePlayground>
