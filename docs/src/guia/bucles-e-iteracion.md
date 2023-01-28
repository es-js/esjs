# Bucles e iteración

Los bucles ofrecen una forma rápida y sencilla de hacer algo repetidamente. Esta sección presenta las diferentes declaraciones de iteración disponibles para EsJS.

Puedes pensar en un bucle como una versión computarizada del juego en la que le dices a alguien que dé _X_ pasos en una dirección y luego _Y_ pasos en otra. Por ejemplo, la idea "Ve cinco pasos hacia el este" se podría expresar de esta manera como un bucle:

<InlinePlayground>

```esjs
para (var paso = 0; paso < 5; paso++) {
  // Se ejecuta 5 veces, con valores del paso 0 al 4.
  consola.escribir('Iteración N°: ' + paso + ' - Camina un paso hacia el este');
}
```

</InlinePlayground>

Hay diferentes tipos de bucles, pero esencialmente, todos hacen lo mismo: repiten una acción varias veces. (¡Ten en cuenta que es posible que ese número sea cero!).

Los diversos mecanismos de bucle ofrecen diferentes formas de determinar los puntos de inicio y terminación del bucle. Hay varias situaciones que son fácilmente atendidas por un tipo de bucle que por otros.

Las declaraciones para bucles proporcionadas en EsJS son:

-   [Declaración para](#declaracion-para)
-   [Declaración hacer...mientras](#declaracion-hacer-mientras)
-   [Declaración mientras](#declaracion-mientras)
-   [Declaración etiquetada](#declaracion-etiquetada)
-   [Declaración romper](#declaracion-romper)
-   [Declaración continuar](#declaracion-continuar)
-   [Declaración para...en](#declaracion-para-en)
-   [Declaración para...de](#declaracion-para-de)

## Declaración `para`

Un ciclo [`para`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for) se repite hasta que una condición especificada se evalúe como `falso`. El bucle `para` de EsJS es similar al bucle `for` de Java y C.

Una declaración `para` tiene el siguiente aspecto:

```esjs
para ([expresiónInicial]; [expresiónCondicional]; [expresiónDeActualización]) {
  // instrucciones...
}
```

Cuando se ejecuta un bucle `para`, ocurre lo siguiente:

1.  Se ejecuta la expresión de iniciación `expresiónInicial`, si existe. Esta expresión normalmente inicia uno o más contadores de bucle, pero la sintaxis permite una expresión de cualquier grado de complejidad. Esta expresión también puede declarar variables.
2.  Se evalúa la expresión `expresiónCondicional`. Si el valor de `expresiónCondicional` es verdadero, se ejecutan las instrucciones del bucle. Si el valor de `condición` es falso, el bucle `para` termina. (Si la expresión `condición` se omite por completo, se supone que la condición es verdadera).
3.  Se ejecuta la `instrucción`. Para ejecutar varias instrucciones, usa una declaración de bloque (`{ ... }`) para agrupar esas declaraciones.
4.  Si está presente, se ejecuta la expresión de actualización `expresiónDeActualización`.
5.  El control regresa al paso 2.

#### Ejemplo

El siguiente ejemplo muestra los 10 primeros números del Sistema Decimal.

<InlinePlayground>

```esjs
var i;
para (i = 0; i < 10; i++) {
  consola.escribir(i);
}
```

</InlinePlayground>

## Declaración `hacer...mientras`

La instrucción [`hacer...mientras`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/do...while) se repite hasta que una condición especificada se evalúe como falsa.

Una declaración `hacer...mientras` tiene el siguiente aspecto:

```esjs
hacer {
  // instrucciones...
} mientras (condición);
```

La declaración de bloque **siempre se ejecuta una vez antes de que se verifique la condición**.

Si `condición` es `verdadero`, la declaración se ejecuta de nuevo. Al final de cada ejecución, se comprueba la condición. Cuando la condición es `falso`, la ejecución se detiene y el control pasa a la declaración que sigue a `hacer...mientras`.

#### Ejemplo

Similar al ejemplo anterior, pero utilizando el bucle `hacer`.

<InlinePlayground>

```esjs
var i = 0; 

hacer { 
  consola.escribir(i); 
  i = i + 1; 
} mientras (i < 10);
```

</InlinePlayground>

## Declaración `mientras`

Una declaración [`mientras`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/while) ejecuta sus instrucciones siempre que una condición especificada se evalúe como `verdadero`. Una instrucción `mientras` tiene el siguiente aspecto:

```esjs
mientras (condición) {
  // instrucciones...
}
```

Si la `condición` se vuelve `falso`, la `instrucción` dentro del bucle se deja de ejecutar y el control pasa a la instrucción que sigue al bucle.

**La prueba de condición ocurre _antes_ de que se ejecute la `expresión` en el bucle**. Si la condición devuelve `verdadero`, se ejecuta la `expresión` y la `condición` se prueba de nuevo. Si la condición devuelve `falso`, la ejecución se detiene y el control se pasa a la instrucción que sigue a `mientras`.

#### Ejemplo 1

Similar al ejemplo anterior, pero utilizando el bucle `mientras`.

<InlinePlayground>

```esjs
var n = 0;
mientras (n < 10) {
  consola.escribir(n);
  n++;
}
```

</InlinePlayground>

#### Ejemplo 2

Evita los bucles infinitos. Asegúrate de que la condición en un bucle eventualmente se convierta en `falso`; de lo contrario, el bucle nunca terminará y podría provocar que tu aplicación entre en un estado inconsistente. El siguiente ejemplo muestra cómo se comporta un bucle infinito. Aunque, en este caso, EsJS Editor previene la ejecución infinita, ya que de lo contrario tu navegador web colapsaría debido a la ejecución infinita de las instrucciones:

[//]: # (<InlinePlayground>)

```esjs
// ¡Los bucles infinitos son malos!
var i = 0;
mientras (i > 0) {
  consola.escribir('Iteración N°: ' + i);
  i++;
}
```

[//]: # (</InlinePlayground>)

## Declaración `etiquetada`

Una [`etiqueta`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/label) proporciona una instrucción con un identificador que te permite hacer referencia a ella en otra parte de tu programa. Por ejemplo, puedes usar una etiqueta para identificar un bucle y luego usar las declaraciones `romper` o `continuar` para indicar si un programa debe interrumpir el bucle o continuar su ejecución. La sintaxis de la instrucción etiquetada es similar a la siguiente:

```esjs
etiqueta : instrucción
```

El valor de `etiqueta` puede ser cualquier identificador de EsJS que no sea una palabra reservada. La `declaración` que identifica a una etiqueta puede ser cualquier enunciado.

**Ejemplo**

En este ejemplo, la etiqueta `bucleEtiquetado` identifica un bucle `mientras`.

<InlinePlayground>

```esjs
var i = 0;
bucleEtiquetado: mientras (i < 10) { 
    consola.escribir(i);
    i++;
}
```

</InlinePlayground>

## Declaración `romper`

Usa la instrucción [`romper`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/break) para terminar un bucle, o una declaración `elegir`, o junto con una declaración etiquetada.

-   Cuando usas `romper` sin una etiqueta, inmediatamente termina el `mientras`, `hacer-mientras`, `para` o `elegir` y transfiere el control a la siguiente declaración.
-   Cuando usas `romper` con una etiqueta, termina la declaración etiquetada especificada.

La sintaxis de la instrucción `romper` se ve así:

```esjs
romper;            // sin etiqueta
romper [etiqueta]; // con etiqueta
```

1.  La primera forma de la sintaxis termina el bucle envolvente más interno o el `elegir`.
2.  La segunda forma de la sintaxis termina la instrucción etiquetada específica.

#### Ejemplo 1

El siguiente ejemplo pretende mostrar los primeros 10 números del Sistema Decimal. Sin embargo, dentro de la declaración `para`, hay una declaración `si` que ejecuta la instrucción `romper` cuando `i` es mayor a `5`. De esta manera, sólo se muestran los primeros 6 números (del 0 al 5).

<InlinePlayground>

```esjs
para (var i = 0; i < 10; i++) {
  si (i > 5) {
    romper;
  }
  
  consola.escribir(i);
}
```

</InlinePlayground>

### 

#### Ejemplo 2

Haciendo uso declaraciones etiquetadas, el siguiente ejemplo cómo se puede `romper`  una declaración etiquetada, cuando oc

<InlinePlayground>

```esjs
var x = 0;
var z = 0;
bucleCancelable: mientras (verdadero) {
  consola.escribir('Bucles externos: ' + x);
  x += 1;
  z = 1;
  mientras (verdadero) {
    consola.escribir('Bucles internos: ' + z);
    z += 1;
    si (z === 10 && x === 10) {
      romper bucleCancelable;
    } sino si (z === 10) {
      romper;
    }
  }
}
```

</InlinePlayground>

## Declaración `continuar`

La instrucción [`continuar`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/continue) se puede usar para reiniciar un `mientras`, `hacer-mientras`, `para`, o declaración `etiqueta`.

-   Cuando utilizas `continuar` sin una etiqueta, finaliza la iteración actual del `mientras`, `hacer-mientras` o `para` y continúa la ejecución del bucle con la siguiente iteración. A diferencia de la instrucción `romper`, `continuar` no termina la ejecución del bucle por completo. En un bucle `mientras`, vuelve a la condición. En un bucle `para`, salta a la `expresión-incremento`.
-   Cuando usas `continuar` con una etiqueta, se aplica a la declaración de bucle identificada con esa etiqueta.

La sintaxis de la instrucción `continuar` se parece a la siguiente:

```esjs
continuar;            // sin etiqueta
continuar [etiqueta]; // con etiqueta
```

#### Ejemplo 1

El siguiente ejemplo muestra un bucle `mientras` con una instrucción `continuar` que se ejecuta cuando el valor de `i` es `3`. Por lo tanto, `n` toma los valores `1`, `3`, `7` y `12`. Si comentas la declaración `continuar` de la línea 6, `n` toma los valores `1`, `3`, `6`, `10`, `15`.

<InlinePlayground only-playground>

```esjs
var i = 0;
var n = 0;
mientras (i < 5) {
  i++;
  si (i === 3) {
    continuar; // Si comentas esta linea, produce: 1, 3, 6, 10, 15
  }
  n += i;
  consola.escribir(n);
}
// Produce: 1, 3, 7, 12
```

</InlinePlayground>

#### Ejemplo 2

Una declaración etiquetada `bucleI` contiene una declaración etiquetada `bucleJ`. Si se encuentra `continuar`, el programa termina la iteración actual de `bucleJ` y comienza la siguiente iteración. Cada vez que se encuentra `continuar`, `bucleJ` reitera hasta que su condición devuelve `falso`. Cuando se devuelve `falso`, el resto de la instrucción `bucleI` se completa y `bucleI` reitera hasta que su condición devuelve `falso`. Cuando se devuelve `falso`, el programa continúa en la declaración que sigue a `bucleI`.

Si `continuar` tuviera una etiqueta de `bucleI`, el programa continuaría en la parte superior de la declaración `bucleI`.

<InlinePlayground>

```esjs
var i = 0;
var j = 10;
bucleI: mientras (i < 4) { 
    consola.depurar('bucleI: ' + i);
    i += 1;
    bucleJ: mientras (j > 4) { 
        j -= 1;
        consola.depurar('blucleJ: ' + j);
        si ((j % 2) === 0) { 
            continue bucleJ;
        }
        consola.escribir(j + ' es impar.');
    } 
    
    consola.escribir('i = ' + i);
    consola.escribir('j = ' + j);
}
```

</InlinePlayground>

## Declaración `para...en`

La instrucción [`para...en`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for...in) itera una variable especificada sobre todas las propiedades enumerables de un objeto. Para cada propiedad distinta, EsJS ejecuta las instrucciones especificadas. Una declaración `para...en` tiene el siguiente aspecto:

```esjs
para (variable en objeto) {
  // instrucciones...
}
```

#### Ejemplo

La siguiente función toma como argumento un objeto y el nombre del objeto. Luego itera sobre todas las propiedades del objeto y devuelve una cadena que enumera los nombres de las propiedades y sus valores.

<InlinePlayground>

```esjs
funcion mostrarPropiedades(objeto, objeto_nombre) {
  var resultado = '';
  para (var i en objeto) {
    resultado += objeto_nombre + '.' + i + ' = ' + objeto[i] + '\n';
  }
  resultado += '---';
  retornar resultado;
}

const auto = {
  marca: 'Ford',
  modelo: 'Mustang',
};

consola.escribir(mostrarPropiedades(auto, 'auto'));
```

</InlinePlayground>

### Arreglos

Aunque puede ser tentador usar esto como una forma de iterar sobre los elementos [`Arreglo`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array), la instrucción `para...en` devolverá el nombre de sus propiedades definidas por el usuario además de los índices numéricos.

Por lo tanto, es mejor usar un bucle [`para`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for) tradicional con un índice numérico cuando se itera sobre arreglos, porque la instrucción `para...en` itera sobre las propiedades definidas por el usuario además de los elementos del arreglo, si modificas el objeto `Arreglo` (tal como agregar propiedades o métodos personalizados).

## Declaración `para...de`

La declaración [`para...de`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for...of) crea un bucle que se repite sobre [objetos iterables](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Iteration_protocols) (incluidos [`Arreglo`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array), [`Mapa` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Currently only available in English (US)"), [`Set`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set), objetos [`argumentos`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/arguments) y así sucesivamente), invocando un bucle de iteración personalizado con declaraciones que se ejecutarán para el valor de cada distinta propiedad.

```esjs
para (variable de objeto) {
  // instrucciones...
}
```

El siguiente ejemplo muestra la diferencia entre un bucle `para...de` y un bucle [`para...en`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for...in). Mientras que `para...en` itera sobre los nombres de propiedad, `para...de` itera sobre los valores de propiedad:

<InlinePlayground>

```esjs
const lista = [3, 5, 7];
lista.foo = 'hola';

para (var i en lista) {
   consola.escribir(i); // muestra "0", "1", "2", "foo"
}

consola.escribir('---');

para (var i de lista) {
   consola.escribir(i); // muestra 3, 5, 7
}
```

</InlinePlayground>
