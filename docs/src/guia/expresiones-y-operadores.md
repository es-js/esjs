# Expresiones y operadores

Esta sección describe las expresiones y los operadores de EsJS, incluyendo los de asignación, comparación, aritméticos, bit a bit, lógicos, ternarios, de cadena y otros.

También se encuentra disponible una lista completa y detallada de operadores y expresiones en la `referencia`.

## Operadores

EsJS tiene los siguientes tipos de operadores. Esta sección describe los operadores y contiene información sobre la precedencia de los mismos.

-   [Operadores de asignación](#operadores-de-asignacion)
-   [Operadores de comparación](#operadores-de-comparacion)
-   [Operadores aritméticos](#operadores-aritmeticos)
-   [Operadores bit a bit](#operadores-bit-a-bit)
-   [Operadores lógicos](#operadores-logicos)
-   [Operadores de cadena](#operadores-de-cadena)
-   [Operador condicional (ternario)](#operador-condicional-ternario)
-   [Operador coma](#operador-coma)
-   [Operadores unarios](#operadores-unarios)
-   [Operadores relacionales](#operadores-relacionales)

Los operadores pueden ser:
- unarios: Requieren un sólo operando, ya sea antes o después del operador:

```esjs
operador operando

// o bien:

operando operador
```

Por ejemplo, `x++` o `++x`.

- binarios: Requieren dos operandos, uno antes del operando y otro después del operador:

```esjs
operando1 operador operando2
```

Por ejemplo, `3+4` o `x*y`.

- ternarios: Requieren tres operandos. Sólo hay un operador ternario en EsJS/JavaScript, y es el operador condicional.

Por ejemplo, `x > 0 ? '+' : '-'`.

### Operadores de asignación

<!--@include: ../operadores/operadores-asignacion.md-->

#### Valor de retorno y encadenamiento

Como la mayoría de las expresiones, asignaciones como `x = y` tienen un valor de retorno. El valor retornado (asignado) se puede recuperar asignando la expresión a una variable o registrándola:

<InlinePlayground>

```esjs
var y = 0;
var x = 1;

const z = (x = y); // O de forma equivalente: const z = x = y;

consola.escribir(z); // Registra el valor de retorno de la asignación x = y
consola.escribir(x = y); // Registra el valor de retorno directamente
```

</InlinePlayground>

El valor de retorno coincide con la expresión a la derecha del signo `=` en la columna "Significado" de la tabla anterior. Eso significa que `(x = y)` devuelve `y`, `(x += y)` devuelve la suma resultante `x + y`, `(x **= y)` devuelve la potencia resultante `x ** y`, y así sucesivamente.

En el caso de asignaciones lógicas, `(x &&= y)`, `(x || = y)` y `(x ??= y)`, el valor de retorno es el de la operación lógica sin la asignación, entonces `x && y`, `x || y` y `x ?? y`, respectivamente.

Ten en cuenta que los valores de retorno siempre se basan en los valores de los operandos _antes_ de la operación.

Al encadenar estas expresiones, cada asignación se evalúa de **derecha a izquierda**. Considera estos ejemplos:

-   `w = z = x = y` es equivalente a `w = (z = (x = y))` o `x = y; z = y; w = y`
-   `z += x *= y` es equivalente e `z += (x *= y)` o `tmp = x * y; x *= y; z += tmp` (salvo que sin `tmp`).

#### Desestructuración

Para asignaciones más complejas, la sintaxis de `asignación de desestructuración` es una expresión de EsJS que hace posible extraer datos de arreglos u objetos usando una sintaxis que refleja la construcción de arreglos y objetos literales.

<InlinePlayground>

```esjs
var foo = ['one', 'two', 'three'];

// sin desestructurar
var uno = foo[0];
var dos = foo[1];
var tres = foo[2];

// con desestructuración
[uno, dos, tres] = foo;

console.escribir(uno, dos, tres);
```

</InlinePlayground>

### Operadores de comparación

<!--@include: ../operadores/operadores-comparacion.md-->

### Operadores aritméticos

Un operador aritmético toma valores numéricos (ya sean literales o variables) como sus operandos y devuelve un solo valor numérico. Los operadores aritméticos estándar son suma (`+`), resta (`-`), multiplicación (`*`) y división (`/`). Estos operadores funcionan como lo hacen en la mayoría de los otros lenguajes de programación cuando se usan con números de punto flotante (en particular, ten en cuenta que la división entre cero produce [`Infinity`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Infinity)). Por ejemplo:

```esjs
1 / 2; // 0.5
1 / 2 == 1.0 / 2.0; // Esto es true
```

Además de las operaciones aritméticas estándar (`+`, `-`, `*`, `/`), EsJS proporciona los operadores aritméticos enumerados en la siguiente tabla:

| Operador                            | Descripción                                                                                                                                                                                                                                 | Ejemplo                                                                                                                          |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `Residuo` (`%`)                     | Operador binario. Devuelve el resto entero de dividir los dos operandos.                                                                                                                                                                    | 12 % 5 devuelve 2.                                                                                                               |
| `Incremento` (`++`)                 | Operador unario. Agrega uno a su operando. Si se usa como operador prefijo (`++x`), devuelve el valor de su operando después de agregar uno; si se usa como operador sufijo (`x++`), devuelve el valor de su operando antes de agregar uno. | Si `x` es 3, `++x` establece `x` en 4 y devuelve 4, mientras que `x++` devuelve 3 y , solo entonces, establece `x` en 4.         |
| `Decremento` (`--`)                 | Operador unario. Resta uno de su operando. El valor de retorno es análogo al del operador de incremento.                                                                                                                                    | Si `x` es 3, entonces `--x` establece `x` en 2 y devuelve 2, mientras que `x--` devuelve 3 y, solo entonces, establece `x` en 2. |
| `Negación unaria` (`-`)             | Operador unario. Devuelve la negación de su operando.                                                                                                                                                                                       | Si `x` es 3, entonces `-x` devuelve -3.                                                                                          |
| `Positivo unario` (`+`)             | Operador unario. Intenta convertir el operando en un número, si aún no lo es.                                                                                                                                                               | `+"3"` devuelve `3`. `+true` devuelve `1.`                                                                                       |
| `Operador de exponenciación` (`**`) | Calcula la `base` a la potencia de `exponente`, es decir, `baseexponente`                                                                                                                                                                   | `2 ** 3` returns `8`. `10 ** -1` returns `0.1`.                                                                                  |

### Operadores bit a bit

Un operador bit a bit trata a sus operandos como un conjunto de 32 bits (ceros y unos), en lugar de números decimales, hexadecimales u octales. Por ejemplo, el número decimal nueve tiene una representación binaria de 1001. Los operadores bit a bit realizan sus operaciones en tales representaciones binarias, pero devuelven valores numéricos estándar de EsJS.

La siguiente tabla resume los operadores bit a bit de EsJS.

| Operador                                              | Uso       | Descripción                                                                                                                                                                                |
|-------------------------------------------------------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `AND a nivel de bits`                                 | `a & b`   | Devuelve un uno en cada posición del bit para los que los bits correspondientes de ambos operandos son unos.                                                                               |
| `OR a nivel de bits`                                  | `a        | b`                                                                                                                                                                                         | Devuelve un cero en cada posición de bit para el cual los bits correspondientes de ambos operandos son ceros. |
| `XOR a nivel de bits`                                 | `a ^ b`   | Devuelve un cero en cada posición de bit para la que los bits correspondientes son iguales. \[Devuelve uno en cada posición de bit para la que los bits correspondientes son diferentes\]. |
| `NOT a nivel de bits`                                 | `~ a`     | Invierte los bits de su operando.                                                                                                                                                          |
| `Desplazamiento a la izquierda`                       | `a << b`  | Desplaza `a` en representación binaria `b` bits hacia la izquierda, desplazándose en ceros desde la derecha.                                                                               |
| `Desplazamiento a la derecha de propagación de signo` | `a >> b`  | Desplaza `a` en representación binaria `b` bits a la derecha, descartando los bits desplazados.                                                                                            |
| `Desplazamiento a la derecha de relleno cero`         | `a >>> b` | Desplaza `a` en representación binaria `b` bits hacia la derecha, descartando los bits desplazados y desplazándose en ceros desde la izquierda.                                            |

#### Operadores lógicos bit a bit

Conceptualmente, los operadores lógicos bit a bit funcionan de la siguiente manera:

-   Los operandos se convierten en enteros de treinta y dos bits y se expresan mediante una serie de bits (ceros y unos). A los números con más de 32 bits se les descartan los bits más significativos. Por ejemplo, el siguiente número entero con más de 32 bits se convertirá en un número entero de 32 bits:

    ```bash
    Antes:  1110 0110 1111 1010 0000 0000 0000 0110 0000 0000 0001
    Después:               1010 0000 0000 0000 0110 0000 0000 0001
    ```

-   Cada bit en el primer operando se empareja con el bit correspondiente en el segundo operando: primer bit al primer bit, segundo bit al segundo bit, y así sucesivamente.
-   El operador se aplica a cada par de bits y el resultado se construye bit a bit.

Por ejemplo, la representación binaria de nueve es 1001 y la representación binaria de quince es 1111. Entonces, cuando los operadores bit a bit se aplican a estos valores, los resultados son los siguientes:

| Expresión | Resultado | Descripción binaria                                   |
|-----------|-----------|-------------------------------------------------------|
| `15 & 9`  | `9`       | `1111 & 1001 = 1001`                                  |
| `15       | 9`        | `15`                                                  | `1111 | 1001 = 1111` |
| `15 ^ 9`  | `6`       | `1111 ^ 1001 = 0110`                                  |
| `~15`     | `-16`     | `~ 0000 0000 ... 0000 1111 = 1111 1111 ... 1111 0000` |
| `~9`      | `-10`     | `~ 0000 0000 ... 0000 1001 = 1111 1111 ... 1111 0110` |

Ten en cuenta que los 32 bits se invierten utilizando el operador `NOT` a nivel de bits y que los valores con el bit más significativo (más a la izquierda) establecido en 1 representan números negativos (representación en complemento a dos). `~x` evalúa al mismo valor que evalúa `-x - 1`.

#### Operadores de desplazamiento de bits

Los operadores de desplazamiento bit a bit toman dos operandos: el primero es una cantidad que se va a desplazar y el segundo especifica el número de posiciones de bit por las que se va a desplazar el primer operando. La dirección de la operación de desplazamiento es controlada por el operador utilizado.

Los operadores de desplazamiento convierten sus operandos en enteros de treinta y dos bits y devuelven un resultado del mismo tipo que el operando izquierdo.

Los operadores de desplazamiento se enumeran en la siguiente tabla.

| Operador                                                     | Descripción                                                                                                                                                                                                                 | Ejemplo                                                                                                                                                                                                                                                              |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Desplazamiento a la izquierda` (`<<`)                       | Este operador desplaza el primer operando el número especificado de bits a la izquierda. Los bits desplazados en exceso hacia la izquierda se descartan. Los bits cero se desplazan desde la derecha.                       | `9<<2` produce 36, porque 1001 desplazado 2 bits a la izquierda se convierte en 100100, que es 36.                                                                                                                                                                   |
| `Desplazamiento a la derecha de propagación de signo` (`>>`) | Este operador desplaza el primer operando el número especificado de bits a la derecha. Los bits desplazados en exceso hacia la derecha se descartan. Las copias del bit más a la izquierda se desplazan desde la izquierda. | `9>>2` produce 2, porque 1001 desplazado 2 bits a la derecha se convierte en 10, que es 2. Del mismo modo, `-9>>2` produce -3, porque el signo se conserva.                                                                                                          |
| `Desplazamiento a la derecha de relleno cero` (`>>>`)        | Este operador desplaza el primer operando el número especificado de bits a la derecha. Los bits desplazados en exceso hacia la derecha se descartan. Los bits cero se desplazan desde la izquierda.                         | `19>>>2` produce 4, porque 10011 desplazado 2 bits a la derecha se convierte en 100, que es 4. Para números no negativos, el desplazamiento a la derecha de relleno con ceros y el desplazamiento a la derecha de propagación del signo producen el mismo resultado. |

### Operadores lógicos

<!--@include ../operadores/operadores-logicos.md-->

#### Evaluación de cortocircuito

Debido a que las expresiones lógicas se evalúan de izquierda a derecha, se prueban para una posible evaluación de "cortocircuito" utilizando las siguientes reglas:

-   `falso` && _anything_ se evalúa en cortocircuito como `falso`.
-   `true` || _anything_ se evalúa en cortocircuito como `true`.

Las reglas de la lógica garantizan que estas evaluaciones sean siempre correctas. Ten en cuenta que la parte _anything_ de las expresiones anteriores no se evalúa, por lo que los efectos secundarios de hacerlo no surten efecto.

Ten en cuenta que para el segundo caso, en el código moderno puedes usar el crear `operador de fusión nulo` (`??`) que funciona como `||`, pero solo devuelve la segunda expresión, cuando la primera es "[nullish (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Nullish "Currently only available in English (US)")", es decir, `null`, el valor nulo representa la ausencia intencional de cualquier valor de objeto. Es uno de los valores primitivos de EsJS y se trata como falso para las operaciones booleanas. o `undefined` la propiedad global undefined representa el valor "`undefined`" primitivo. Es uno de los tipos primitivos de EsJS. Por tanto, es la mejor alternativa para proporcionar valores predeterminados, cuando valores como `''` o `0` también son valores válidos para la primera expresión.

### Operadores de cadena

<!--@include ../operadores/operadores-cadena.md-->

### Operador condicional (ternario)

<!--@include ../operadores/operador-condicional-ternario.md-->

### Operador coma

El `operador coma` (`,`) simplemente evalúa ambos operandos y devuelve el valor del último operando. Este operador se utiliza principalmente dentro de un bucle `for`, para permitir que se actualicen múltiples variables cada vez a través del bucle. Se considera de mal estilo usarlo en otros lugares, cuando no es necesario. A menudo, en su lugar pueden y se deben utilizar dos declaraciones independientes.

Por ejemplo, si `a` es un arreglo bidimensional con 10 elementos en un lado, el siguiente código usa el operador `coma` para actualizar dos variables a la vez. El código imprime los valores de los elementos diagonales en el arreglo:

<InlinePlayground>

```esjs
var x = [0,1,2,3,4,5,6,7,8,9]
var a = [x, x, x, x, x];

para (var i = 0, j = 9; i <= j; i++, j--) {
  consola.escribir('a[' + i + '][' + j + ']= ' + a[i][j]);
}
```

</InlinePlayground>

### Operadores unarios

Una operación unaria es una operación con un solo operando.

#### `eliminar`

El operador `eliminar` elimina la propiedad de un objeto. La sintaxis es:

```esjs
eliminar objeto.propiedad;
eliminar objeto[propiedadClave];
eliminar nombreObjeto[index];
eliminar propiedad; // legal solo dentro de una declaración with
```

donde `objeto` es el nombre de un objeto, `propiedad` es una propiedad existente y `propiedadClave` es una cadena o símbolo que hace referencia a una propiedad existente.

La cuarta forma es legal solo dentro de una declaración `with`, para eliminar una propiedad de un objeto, y también para las propiedades del objeto global.

Si el operador `eliminar` tiene éxito, elimina la propiedad del objeto. Intentar acceder a él después dará como resultado `indefinido`. El operador `eliminar` devuelve `verdadero` si la operación es posible; devuelve `falso` si la operación no es posible.

```esjs
x = 42; // implícitamente crea window.x
var y = 43;
var myobj = {h: 4}; // crea un objeto con la propiedad h

eliminar x;       // devuelve verdadero (se puede eliminar si se crea implícitamente)
eliminar y;       // devuelve falso (no se puede borrar si se declara con var)
eliminar Math.PI; // devuelve falso (no se pueden eliminar propiedades no configurables)
eliminar myobj.h; // devuelve verdadero (puede eliminar propiedades definidas por el usuario)
```

##### Eliminar elementos de un arreglo

Dado que los arreglos solo son objetos, técnicamente es posible `eliminar` elementos de ellos. Sin embargo, esto se considera una mala práctica, trata de evitarlo. Cuando eliminas una propiedad de arreglo, la longitud del arreglo no se ve afectada y otros elementos no se vuelven a indexar. Para lograr ese comportamiento, es mucho mejor simplemente sobrescribir el elemento con el valor `indefinido`. Para manipular realmente el arreglo, usa los diversos métodos de arreglo, como `empalmar`.

#### `tipoDe`

El `operador tipoDe` se utiliza de cualquiera de las siguientes formas:

```esjs
tipoDe operando
tipoDe (operando)
```

El operador `tipoDe` devuelve una cadena que indica el tipo de operando no evaluado. `operando` es la cadena, variable, palabra clave u objeto para el que se devolverá el tipo. Los paréntesis son opcionales.

Supón que defines las siguientes variables:

<InlinePlayground>

```esjs
var myFun = crear Function('5 + 2');
var shape = 'round';
var size = 1;
var foo = ['Apple', 'Mango', 'Orange'];
var today = crear Fecha();

consola.escribir(tipoDe myFun);       // devuelve "function"
consola.escribir(tipoDe shape);       // devuelve "string"
consola.escribir(tipoDe size);        // devuelve "number"
consola.escribir(tipoDe foo);         // devuelve "object"
consola.escribir(tipoDe today);       // devuelve "object"
consola.escribir(tipoDe doesntExist); // devuelve "undefined"
```

</InlinePlayground>

Para las palabras clave `verdadero` y `null`, el operador `tipoDe` devuelve los siguientes resultados:

<InlinePlayground>

```esjs
consola.escribir(tipoDe verdadero); // devuelve "boolean"
consola.escribir(tipoDe null); // devuelve "object"
```

</InlinePlayground>

Para un número o cadena, el operador `tipoDe` devuelve los siguientes resultados:

<InlinePlayground>

```esjs
consola.escribir(tipoDe 62);            // devuelve "number"
consola.escribir(tipoDe 'Hola mundo');  // devuelve "string"
```

</InlinePlayground>

Para los valores de propiedad, el operador `tipoDe` devuelve el tipo de valor que contiene la propiedad:

<InlinePlayground>

```esjs
consola.escribir(tipoDe document.lastModified); // devuelve "string"
consola.escribir(tipoDe window.length);         // devuelve "number"
consola.escribir(tipoDe Math.LN2);              // devuelve "number"
```

</InlinePlayground>

Para métodos y funciones, el operador `tipoDe` devuelve los siguientes resultados:

<InlinePlayground>

```esjs
consola.escribir(tipoDe Numero.aEntero); // devuelve "function"
consola.escribir(tipoDe aEntero);    // devuelve "function"
consola.escribir(tipoDe eval);        // devuelve "function"
```

</InlinePlayground>

Para objetos predefinidos, el operador `tipoDe` devuelve los siguientes resultados:

<InlinePlayground>

```esjs
consola.escribir(tipoDe Fecha);     // devuelve "function"
consola.escribir(tipoDe Funcion); // devuelve "function"
consola.escribir(tipoDe Mate);     // devuelve "object"
consola.escribir(tipoDe Option);   // devuelve "function"
consola.escribir(tipoDe Cadena);   // devuelve "function"
```

</InlinePlayground>

#### `vacio`

El `operador vacio` se utiliza de cualquiera de las siguientes formas:

```esjs
vacio (expression)
vacio expression
```

El operador `vacio` especifica una expresión que se evaluará sin devolver un valor. `expression` es una expresión de EsJS para evaluar. Los paréntesis que rodean la expresión son opcionales, pero es un buen estilo usarlos.

### Operadores relacionales

Un operador relacional compara sus operandos y devuelve un valor `Boolean` basado en si la comparación es verdadera.

#### `en`

El `operador en` devuelve `verdadero` si la propiedad especificada está en el objeto especificado. La sintaxis es:

```esjs
propiedadNombreONumero in nombreObjeto
```

donde `propiedadNombreONumero` es una expresión de cadena, numérica o de símbolo que representa un nombre de propiedad o índice de arreglo, y `nombreObjeto` es el nombre de un objeto.

Los siguientes ejemplos muestran algunos usos del operador `en`.

```esjs
// Arreglos
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
0 in trees;        // devuelve verdadero
3 in trees;        // devuelve verdadero
6 in trees;        // devuelve falso
'bay' in trees;    // devuelve falso (debes especificar el número del índice,
                   // no el valor en ese índice)
'length' en trees; // devuelve verdadero (la longitud es una propiedad de Array)

// objetos integrados
'PI' in Math;          // devuelve verdadero
var myString = crear Cadena('coral');
'length' in myString;  // devuelve verdadero

// Objetos personalizados
var mycar = { make: 'Honda', model: 'Accord', year: 1998 };
'make' in mycar;  // devuelve verdadero
'model' in mycar; // devuelve verdadero
```

#### `instanciaDe`

El `operador instanciaDe` devuelve `verdadero` si el objeto especificado es del tipo de objeto especificado. La sintaxis es:

```esjs
nombreObjeto instanciaDe objectType
```

donde `nombreObjeto` es el nombre del objeto para comparar con `objectType`, y `objectType` es un tipo de objeto, como [`Date`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date) o [`Array`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array).

Utiliza `instanciaDe` cuando necesites confirmar el tipo de un objeto en tiempo de ejecución. Por ejemplo, al detectar excepciones, puedes ramificar a diferentes controladores según el tipo de excepción lanzada.

Por ejemplo, el siguiente código usa `instanciaDe` para determinar si `elDia` es un objeto `Date`. Debido a que `elDia` es un objeto `Date`, las instrucciones de la expresión `if` se ejecutan.

```esjs
var elDia = crear Fecha(1995, 12, 17);
si (elDia instanciaDe Fecha) {
  // instrucciones a ejecutar
}
```

### Precedencia de los operadores

La _precedencia_ de los operadores determina el orden en que se aplican al evaluar una expresión. Puedes redefinir la precedencia de los operadores mediante el uso de paréntesis.

La siguiente tabla describe la precedencia de los operadores, de mayor a menor.

| Tipo de operador         | Operadores individuales              |
|--------------------------|--------------------------------------|
| miembro                  | `. []`                               |
| llamar / crear instancia | `() new`                             |
| negación / incremento    | `! ~ - + ++ -- typeof void eliminar` |
| multiplicar / dividir    | `* / %`                              |
| adición / sustracción    | `+ -`                                |
| desplazamiento bit a bit | `<< >> >>>`                          |
| relacional               | `< <= > >= in instanciaDe`           |
| igualdad                 | `== != === !==`                      |
| `AND` bit a bit          | `&`                                  |
| `XOR` bit a bit          | `^`                                  |
| `OR` bit a bit           | `\|`                                 |
| `AND` lógico             | `&&`                                 |
| `OR` lógico              | `\|\|`                               |
| condicional              | `?:`                                 |
| asignación               | `= += -= *= /= %= <<= >>= >>>= &= ^=\|= &&= \|\|= ??=` |
| coma                     | `,`                                  |

Puedes encontrar una versión más detallada de esta tabla, completa con enlaces a detalles adicionales sobre cada operador, en `Referencia de JavaScript`.

## Expresiones

Una _expresión_ es cualquier unidad de código válida que se resuelve en un valor.

Toda expresión sintácticamente válida se resuelve en algún valor, pero conceptualmente, hay dos tipos de expresiones: con efectos secundarios (por ejemplo: las que asignan valor a una variable) y las que en algún sentido evalúan y por lo tanto se resuelven en un valor.

La expresión `x = 7` es un ejemplo del primer tipo. Esta expresión usa el _operador_ = para asignar el valor siete a la variable `x`. La expresión en sí se evalúa como siete.

El código `3 + 4` es un ejemplo del segundo tipo de expresión. Esta expresión usa el operador + para sumar tres y cuatro sin asignar el resultado, siete, a una variable.

EsJS tiene las siguientes categorías de expresión:

-   Aritméticas: se evalúa como un número, por ejemplo 3.14159. (Generalmente usa [operadores aritméticos](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Expressions_and_Operators##aritm%C3%A9ticos)).
-   Cadenas: se evalúa como una cadena de caracteres, por ejemplo, "Fred" o "234". (Generalmente usa [operadores de cadena](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Expressions_and_Operators#cadena)).
-   Lógicas: se evalúan como `verdadero` o `falso`. (A menudo implica [operadores lógicos](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Expressions_and_Operators#logico)).
-   Expresiones primarias: palabras clave básicas y expresiones generales en EsJS.
-   Expresiones del lado izquierdo: los valores del lado izquierdo son el destino de una asignación.

### Expresiones primarias

Palabras clave básicas y expresiones generales en EsJS.

#### `ambiente`

Utiliza la `palabra clave este` para hacer referencia al objeto actual. En general, `ambiente` se refiere al objeto que llama en un método. Usa `ambiente` con la notación de punto o entre corchetes:

```esjs
ambiente['nombrePropiedad']
ambiente.nombrePropiedad
```

Supongamos que una función llamada `validar` valida la propiedad `valor` de un objeto, dado el objeto y los valores alto y bajo:

```esjs
function validar(objeto, valorBajo, valorAlto) {
  si ((objeto.valor < valorBajo) || (objeto.valor > valorAlto))
    consola.escribir('¡Valor no válido!');
}
```

Puedes llamar a `validar` en el controlador de eventos `onChange` de cada elemento de formulario, utilizando `ambiente` para pasarlo al elemento de formulario, como en el siguiente ejemplo:

```
<p>Ingresa un número entre 18 y 99:</p>
<input type="text" name="age" size=3 onChange="validar(this, 18, 99);">
```

#### Operador de agrupación

El operador de agrupación `()` controla la precedencia de la evaluación en las expresiones. Por ejemplo, puedes redefinir la multiplicación y la división primero, luego la suma y la resta para evaluar la suma primero.

```esjs
var a = 1;
var b = 2;
var c = 3;

// precedencia predeterminada
a + b * c     // 7
// evaluado por omisión así
a + (b * c)   // 7

// ahora prevalece sobre la precedencia
// suma antes de multiplicar
(a + b) * c   // 9

// que es equivalente a
a * c + b * c // 9
```

### Expresiones del lado izquierdo

Los valores de la izquierda son el destino de una asignación.

#### `crear`

Puedes utilizar el `operador crear` para crear una instancia de un tipo de objeto definido por el usuario o de uno de los tipos de objeto integrados. Utiliza `crear` de la siguiente manera:

```esjs
var nombreObjeto = crear objectType([param1, param2, ..., paramN]);
```

#### `super`

La `palabra clave super` se utiliza para llamar a funciones en el padre de un objeto. Es útil con [`clases`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes) llamar al constructor padre, por ejemplo.

```esjs
super([arguments]); // llama al constructor padre.
super.functionOnParent([arguments]);
```
