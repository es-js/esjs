# Declaración `elegir` (switch)

La declaración `elegir` evalúa una expresión, comparando el resultado con la expresión de cada caso, y ejecuta las instrucciones asociadas al caso que coincida con el resultado. Si no hay coincidencia, se ejecuta el caso `defecto`.

Cada caso debe terminar con la palabra clave `romper`, que indica que el programa debe salir del `elegir`. Si no se incluye la palabra clave `romper`, el programa continuará ejecutando las instrucciones del caso siguiente.

```esjs
elegir (expresion) {
    caso valor1:
        // código
        romper;
    caso valor2:
        // código
        romper;
    defecto:
        // código
        romper;
}
```

## Ejemplo

<InlinePlayground>

```esjs
var dia = 2;

elegir (dia) {
    caso 1:
        consola.escribir('Lunes');
        romper;
    caso 2:
        consola.escribir('Martes');
        romper;
    caso 3:
        consola.escribir('Miércoles');
        romper;
    caso 4:
        consola.escribir('Jueves');
        romper;
    caso 5:
        consola.escribir('Viernes');
        romper;
    caso 6:
        consola.escribir('Sábado');
        romper;
    caso 7:
        consola.escribir('Domingo');
        romper;
    defecto:
        consola.escribir('Valor no válido');
        romper;
}

```

</InlinePlayground>
