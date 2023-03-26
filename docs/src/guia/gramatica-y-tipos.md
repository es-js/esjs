# Gramática y Tipos

Esta sección analiza la gramática básica de EsJS, declaración de variables, los tipos de datos y literales.

## Conceptos básicos

La sintaxis de EsJS es literalmente la de JavaScript, traducida al Español. A su vez, JavaScript está influenciado sobre todo por la sintaxis de Java, C y C++, pero también ha sido influenciado por Awk, Perl y Python.

EsJS distingue entre mayúsculas y minúsculas (es _case-sensitive_) y utiliza el conjunto de caracteres Unicode. Por ejemplo, la palabra «Año» se podría usar como el nombre de una variable.

```esjs
var Año = "2023"
```

Pero, la variable `año` no es la misma que `Año` porque EsJS distingue entre mayúsculas y minúsculas.

En EsJS, las instrucciones se denominan declaraciones y están separadas por punto y coma (`;`).

No es necesario un punto y coma después de una declaración si está escrita en su propia línea. Pero si deseas más de una declaración en una línea, entonces debes separarlas con punto y coma.

Sin embargo, se considera una buena práctica escribir siempre un punto y coma después de una declaración, incluso cuando no sea estrictamente necesario. Esta práctica reduce las posibilidades de que se introduzcan errores en el código.

El código fuente del script EsJS se escanea de izquierda a derecha y se convierte en una secuencia de elementos de entrada que son fragmentos, caracteres de control, terminadores de línea, comentarios o espacios en blanco. (Los espacios, tabulaciones y caracteres de nueva línea se consideran espacios en blanco).

## Comentarios

La sintaxis de los comentarios es la misma que en C++ y en muchos otros lenguajes:

```esjs
// un comentario de una línea

/* este es un comentario
 * más largo, de varias líneas
 */

/* Sin embargo, no puedes /* anidar comentarios */ SyntaxError */
```

Los comentarios se comportan como espacios en blanco y se descartan durante la ejecución del script.

## Declaraciones

EsJS tiene tres tipos de declaraciones de variables.

- `global`

    Declara una variable global, opcionalmente la inicia a un valor. Equivale a `var` en JavaScript.

- `var`

    Declara una variable local con ámbito de bloque, opcionalmente la inicia a un valor. Equivale a `let` en JavaScript.

- `const`

    Declara un nombre de constante de solo lectura y ámbito de bloque. Equivale a `const` en JavaScript.

### Nombre de variables

Los nombres de las variables, llamados [identificadores](https://developer.mozilla.org/es/docs/Glossary/Identifier), se ajustan a ciertas reglas.

Un identificador de EsJS debe comenzar con una letra, un guión bajo (`_`) o un signo de dólar (`$`). Los siguientes caracteres también pueden ser dígitos (`0`\-`9`).

Dado que EsJS distingue entre mayúsculas y minúsculas, las letras incluyen los caracteres "`A`" a "`Z`" (mayúsculas), así como "`a`" a "`z`" (minúsculas).

Puedes utilizar la mayoría de las letras ISO 8859-1 o Unicode como `å` y `ü` en los identificadores. (Para obtener más detalles, consulta [esta publicación del blog](https://mathiasbynens.be/notes/javascript-identifiers-es6)). También puedes usar `Secuencias de escape Unicode` como caracteres en identificadores.

Algunos ejemplos de nombres permitidos son `Numero_ventas`, `temporal99`, `$crédito` y `_nombre`.

### Declaración de variables

Puedes declarar una variable de dos formas:

-   Con la palabra clave `global`. Por ejemplo, `global x = 42`. Esta sintaxis se puede utilizar para declarar variables **locales** y **globales**, dependiendo del _contexto de ejecución_.
-   Con la palabra clave `const` o `var`. Por ejemplo, `var y = 13`. Esta sintaxis se puede utilizar para declarar una variable local con ámbito de bloque. (Ve el [Ámbito de variables](#ambito-de-variables) abajo.)

### Evaluar variables

Una variable declarada usando la instrucción `global` o `var`, sin un valor asignado especificado, tiene el valor de [`indefinido`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/undefined).

<InlinePlayground only-playground>

```esjs
global a;
consola.escribir('El valor de a es ' + a); // El valor de a es indefinido

var x;
consola.escribir('El valor de x es ' + x); // El valor de x es indefinido
```

</InlinePlayground>

Un intento de acceder a una variable no declarada da como resultado el disparo de una excepción [`ReferenceError`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError):

<InlinePlayground only-playground>

```esjs
consola.escribir('El valor de x es ' + x); // El valor de x es indefinido
```

</InlinePlayground>

Puedes usar `indefinido` para determinar si una variable tiene un valor. En el siguiente código, a la variable `entrada` no se le asigna un valor y la declaración `si` evalúa a `verdadero`.

<InlinePlayground>

```esjs
var entrada;
si (entrada === indefinido) {
  consola.error('Valor indefinido');
} sino {
  consola.escribir('Valor definido');
}
```

</InlinePlayground>

El valor `indefinido` se comporta como `falso` cuando se usa en un contexto booleano. Por ejemplo, el siguiente código ejecuta la función `miFuncion` porque el elemento `0` de `miLista` es `indefinido`:

<InlinePlayground>

```esjs
var miLista = [];
si (!miLista[0]) {
  consola.error('Elemento no definido');
}
```

</InlinePlayground>

El valor `indefinido` se convierte en `NeN` cuando se usa en contexto numérico.

<InlinePlayground>

```esjs
var a;
consola.escribir(a + 2);  // Evalúa a NeN
```

</InlinePlayground>

Cuando evalúas una variable [`nulo`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/null), el valor nulo se comporta como `0` en contextos numéricos y como `falso` en contextos booleanos. Por ejemplo:

<InlinePlayground>

```esjs
var n = nulo;
consola.escribir(n * 32); // Registrará 0 en la consola
```

</InlinePlayground>

### Ámbito de variables

Cuando declaras una variable fuera de cualquier función, se denomina variable _global_, porque está disponible para cualquier otro código en el documento actual. Cuando declaras una variable dentro de una función, se llama variable _local_, porque solo está disponible dentro de esa función.

Por ejemplo, el siguiente código registrará `5`, porque el ámbito de `x` es el contexto global (o el contexto de la función si el código es parte de una función). El ámbito de `x` no se limita al bloque de instrucciones `si` inmediato.

<InlinePlayground>

```esjs
si (verdadero) {
  global x = 5;
}
consola.escribir(x);  // x es 5
```

</InlinePlayground>

Este comportamiento cambia cuando se usa la declaración `var`.

<InlinePlayground>

```esjs
si (verdadero) {
  var x = 5;
}
consola.escribir(x); // ReferenceError: x no está definida
```

</InlinePlayground>

### Variables globales

Las variables globales, en realidad, son propiedades del _objeto global_.

En las páginas web, el objeto global es [`window`](https://developer.mozilla.org/es/docs/Web/API/Window), por lo que puedes establecer y acceder a variables globales utilizando la sintaxis `window.variable`.

En consecuencia, puedes acceder a las variables globales declaradas en una «ventana» o «marco» desde otra «ventana» o «marco» especificando el nombre de la `window` o el `frame`. Por ejemplo, si declaras una variable llamada `numeroTelefono` en un documento, puedes hacer referencia a esta variable desde un `iframe` como `parent.numeroTelefono`.

Además, las variables globales tienen un mecanismo asociado como Elevación (_hoisting_). Puedes conocer más sobre este mecanismo en [Elevación](/avanzado/elevacion)

### Constantes

Puedes crear una constante de solo lectura con nombre con la palabra clave `const`.

La sintaxis de un identificador de constante es la misma que la de cualquier identificador de variable: debe comenzar con una letra, un subrayado o un signo de dólar (`$`) y puede contener caracteres alfabéticos, numéricos o de subrayado.

Una constante no puede cambiar el valor a través de la asignación o volver a declararla mientras se ejecuta el script. Se debe iniciar a un valor.

Las reglas de ámbito para las constantes son las mismas que las de ámbito de bloque de las variables `global`.

Si bien una constante no puede cambiar su valor una vez definida, esto no ocurre con las propiedades de los objetos asignados a constantes; de manera que el siguiente programa se ejecuta sin problemas:

<InlinePlayground>

```esjs
const MI_OBJETO = {'clave': 'valor'};
consola.escribir(MI_OBJETO.clave); // Muestra "valor"

MI_OBJETO.clave = 'otroValor';
consola.escribir(MI_OBJETO.clave); // Muestra "otroValor"
```

</InlinePlayground>

Además, el contenido de los arreglos tampoco está protegido cuando es asignado a una constante, es por esto que la siguiente declaración se ejecuta sin problemas.

<InlinePlayground>

```esjs
const MI_ARREGLO = ['HTML','CSS','JavaScript'];
MI_ARREGLO.push('EsJS');
consola.escribir(MI_ARREGLO); // Muestra ['HTML','CSS','JavaScript','EsJS'];
```

</InlinePlayground>

> **Nota:** No puedes declarar una constante con el mismo nombre que una función o una variable en el mismo ámbito.
>
> Por ejemplo, en el siguiente programa, en la línea 1 se declara una función `f`, y luego en la línea 2 se intenta declarar una constante `f`, lo cual causa una excepción:
>
> <InlinePlayground>
>
> ```esjs{2}
> funcion f() {};
> const f = 5;
> ```
>
> </InlinePlayground>
>
> En el siguiente programa, se declara una variable global `g` en la línea 3 (la cual es [Elevada](/avanzado/elevacion)), y en la línea 2 se intenta declarar una constante `g`, lo cual causa una excepción:
>
> <InlinePlayground>
>
> ```esjs
> funcion f() {
>   const g = 5;
>   global g;
> }
> ```
>
> </InlinePlayground>

## Estructuras y tipos de datos

### Tipos de datos

EsJS define ocho tipos de datos:

-   Siete tipos de datos que son [primitivos](https://developer.mozilla.org/es/docs/Glossary/Primitive):
    1.  [Booleano](https://developer.mozilla.org/es/docs/Glossary/Boolean). `verdadero` y `falso`.
    2.  [nulo](https://developer.mozilla.org/es/docs/Glossary/Null). Una palabra clave especial que denota un valor nulo. (Dado que JavaScript distingue entre mayúsculas y minúsculas, `null` no es lo mismo que `Null`, `NULL` o cualquier otra variante).
    3.  [indefinido](https://developer.mozilla.org/es/docs/Glossary/undefined) (_`undefined`_). Una propiedad de alto nivel cuyo valor no está definido.
    4.  [Numero](https://developer.mozilla.org/es/docs/Glossary/Number). Un número entero o un número con coma flotante. Por ejemplo: `42` o `3.14159`.
    5.  [EnteroGrande](https://developer.mozilla.org/es/docs/Glossary/BigInt). Un número entero con precisión arbitraria. Por ejemplo: `9007199254740992n`.
    6.  [Cadena](https://developer.mozilla.org/es/docs/Glossary/String). Una secuencia de caracteres que representan un valor de texto. Por ejemplo: `"Hola"`.
    7.  [Simbolo](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Symbol). Un tipo de dato cuyas instancias son únicas e inmutables
-   y:

    8.  [Objeto](https://developer.mozilla.org/es/docs/Glossary/Object): Una estructura de datos que contiene _datos_ e _instrucciones_ para trabajar con los datos.
        
        Puedes pensar en objetos como contenedores con identificadores para los valores. Casi todos los objetos en EsJS/JavaScript son instancias de `Objeto`. De hecho, las `Funciones` también son objetos con la capacidad de ser [llamadas](/guia/funciones#llamar-funciones).

### Conversión de tipos de datos

EsJS es un lenguaje _tipado dinámicamente_. Esto significa que no tienes que especificar el tipo de dato de una variable cuando la declaras. También significa que los tipos de datos se convierten automáticamente según sea necesario durante la ejecución del script.

Así, por ejemplo, puedes definir una variable de la siguiente manera:

```esjs
var respuesta = 42;
```

Y luego, puedes asignarle una cadena a esa misma variable, por ejemplo:

```esjs
respuesta = 'Gracias por todo el pescado...';
```

Debido a que EsJS se tipifica dinámicamente, esta asignación no genera un mensaje de error.

### Números y el operador '`+`'

En expresiones que involucran valores numéricos y de cadena con el operador `+`, EsJS convierte los valores numéricos en cadenas. Por ejemplo, considera las siguientes declaraciones:

<InlinePlayground>

```esjs
var x = 'La respuesta es ' + 42; // "La respuesta es 42"
var y = 42 + ' es la respuesta'; // "42 es la respuesta"
consola.escribir(x);
consola.escribir(y);
```

</InlinePlayground>

Con todos los demás operadores, EsJS _no_ convierte valores numéricos en cadenas. Por ejemplo:

<InlinePlayground>

```esjs
consola.escribir('37' - 7); // 30
consola.escribir('37' / 7); // 5.285714285714286
consola.escribir('37' * 7); // 259
consola.escribir('37' + 7); // "377"
```

</InlinePlayground>

### Convertir texto a números

En el caso que un valor representando un número está en memoria como texto (cadena), hay métodos para la conversión:

-   [`Numero.aEntero()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/parseInt): Solo devuelve números enteros, por lo que su uso se reduce para decimales.
-   [`Numero.aDecimal()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/parseFloat): Devuelve números decimales.

#### Ejemplo

Por ejemplo, si tenemos una variable `x` del tipo `Cadena`, y queremos sumarle un valor utilizando el operador `+`, esto resulta en realidad en la operación [`Concatenación`](/wip), en lugar de la [`Suma aritmética`](/wip). Por lo que finalmente estamos concatenando (uniendo) dos cadenas de texto:

<InlinePlayground>

```esjs
var x = '2000'; // x es del tipo "Cadena"

// si queremos sumarle un valor a x, en realidad estamos concatenando las cadenas

consola.escribir(x + 23);
```

</InlinePlayground>

Para este caso, es necesario convertir el contenido de la variable `x` de `Cadena` a `Número` (entero en este caso):

<InlinePlayground>

```esjs
var x = '2000'; // x es del tipo "Cadena"

var xConvertido = Numero.aEntero(x); // xConvetido es del tipo "Número"

consola.escribir(xConvertido + 23);
```

</InlinePlayground>

## Literales

Los _literales_ representan valores en EsJS. Estos son valores fijos, no variables, que _literalmente_ proporcionas en tu script. Esta sección describe los siguientes tipos de literales:

-   [Arreglos literales](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_Types#arreglos_literales)
-   [Booleanos literales](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_Types#booleanos_literales)
-   [Literales de coma flotante](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_Types#literales_de_coma_flotante)
-   [Literales numéricos](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_Types#literales_numericos)
-   [Objetos literales](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_Types#objetos_literales)
-   [RegExp literales](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_Types#regexp_literales)
-   [Cadenas literales](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_Types#cadenas_literales)

### Arreglos literales

Un arreglo literal es una lista de cero o más expresiones, cada una de las cuales representa un elemento del arreglo, encerrada entre corchetes (`[]`). Cuando creas un arreglo utilizando un arreglo literal, se inicia con los valores especificados como sus elementos, y su `longitud` se establece en el número de argumentos especificado.

El siguiente ejemplo crea el arreglo `cafes` con tres elementos y `longitud` de tres:

<InlinePlayground>

```esjs
var cafes = ['French Roast', 'Colombiano', 'Kona'];

consola.escribir('Longitud: ' + cafes.longitud);
consola.escribir(cafes);
```

</InlinePlayground>

> **Nota:** Los arreglos literales también son objetos `Arreglo`. Consulta [`Arreglo`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array) y `Colecciones indexadas` para obtener detalles sobre los objetos `Array`.

#### Comas adicionales en arreglos literales

No tienes que especificar todos los elementos en un arreglo literal. Si colocas dos comas en una fila, el arreglo completa el valor `indefinido` para los elementos no especificados. El siguiente ejemplo crea el arreglo `pez`:

```esjs
var pez = ['Sábalo', , 'Pacú'];
```

Este arreglo tiene dos elementos con valores y un elemento vacío:

- `pez[0]` es "Sábalo"
- `pez[1]` es `indefinido`
- `pez[2]` es "Pacú"

Si incluyes una coma al final de la lista de los elementos, la coma es ignorada.

##### Ejemplos

En el siguiente ejemplo, la `longitud` del arreglo es tres. No hay `miLista[3]`. Todas las demás comas de la lista indican un nuevo elemento.

<InlinePlayground>

```esjs
var miLista = ['casa', , 'escuela', ];

consola.escribir('Longitud: ' + miLista.longitud);
consola.escribir(miLista);
```

</InlinePlayground>

En el siguiente ejemplo, la `longitud` del arreglo es cuatro, y faltan `miLista[0]` y `miLista[2]`.

<InlinePlayground>

```esjs
var miLista = [ ,'casa', , 'escuela'];

consola.escribir('Longitud: ' + miLista.longitud);
consola.escribir(miLista);
```

</InlinePlayground>

En el siguiente ejemplo, la `longitud` del arreglo es cuatro, y faltan `miLista[1]` y `miLista[3]`. **Solo se ignora la última coma.**

<InlinePlayground>

```esjs
var miLista = ['casa', , 'escuela', , ];

consola.escribir('Longitud: ' + miLista.longitud);
consola.escribir(miLista);
```

</InlinePlayground>

Entender el comportamiento de las comas adicionales es importante para comprender EsJS como lenguaje.

Sin embargo, al escribir tu propio código, debes declarar explícitamente los elementos que faltan como `indefinido`. Hacerlo así aumenta la claridad y la facilidad de mantenimiento de tu código.

### Booleanos literales

El tipo booleano tiene dos valores literales: `verdadero` y `falso`.

> **Nota:** **Ten cuidado**: No confundas los valores booleanos primitivos `verdadero` y `falso` con los valores `verdadero` y `falso` del objeto [`Booleano`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Boolean). El objeto `Booleano` es un contenedor alrededor del tipo de dato primitivo `Booleano`. Consulta [`Booleano`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Boolean) para obtener más información.

### Literales numéricos

Los tipos [`Numero`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number) y [`EnteroGrande` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt "Currently only available in English (US)") se pueden escribir en decimal (base 10), hexadecimal (base 16), octal (base 8) y binario (base 2).

-   Un literal numérico _decimal_ es una secuencia de dígitos sin un `0` (cero) inicial.
-   Un `0` (cero) inicial en un literal numérico, o un `0o` inicial (o `0O`) indica que está en _octal_. Los números octales pueden incluir solo los dígitos `0`\-`7`.
-   Un `0x` inicial (o `0X`) indica un tipo numérico _hexadecimal_. Los números hexadecimales pueden incluir los dígitos (`0`\-`9`) y las letras `a`\-`f` y `A`\-`F`. (Si un carácter está en mayúscula o minúscula no cambia su valor. Por lo tanto: `0xa` = `0xA` = `10` y `0xf` = `0xF` = `15`).
-   Un `0b` inicial (o `0B`) indica un literal numérico _binario_. Los números binarios solo pueden incluir los dígitos `0` y `1`.

Aquí tienes algunos ejemplos de literales numéricos:

```esjs
0, 117, -345, 123456789123456789n            // (decimal, base 10)
015, 0001, -0o77, 0o777777777777n            // (octal, base 8)
0x1123, 0x00111, -0xF1A7, 0x123456789ABCDEFn // (hexadecimal, "hex" o base 16)
0b11, 0b0011, -0b11, 0b11101001010101010101n // (binario, base 2)
```

Para obtener más información, consulta `Literales numéricos en la referencia gramatical léxica`.

### Literales de coma flotante

Un literal de coma flotante puede tener las siguientes partes:

-   Un entero decimal que puede tener un signo (precedido por "`+`" o "`-`"),
-   Un punto decimal ("`.`"),
-   Una fracción (otro número decimal),
-   Un exponente.

La parte del exponente es una "`e`" o "`E`" seguida de un número entero, que puede tener signo (precedido por "`+`" o "`-`"). Un literal de coma flotante debe tener al menos un dígito y un punto decimal o "`e`" (o "`E`").

Específicamente, la sintaxis es:

```esjs
[(+|-)][dígitos].[dígitos][(E|e)[(+|-)]dígitos]
```

Por ejemplo:

```esjs
3.1415926
-.123456789
-3.1E+12
.1e-23
```

### Objetos literales

Un objeto literal es una lista de cero o más pares de nombres de propiedad y valores asociados de un objeto, entre llaves (`{}`).

> **Advertencia:** **¡No uses un objeto literal al comienzo de una declaración!** Esto dará lugar a un error (o no se comportará como esperabas), porque la `{` se interpretará como el comienzo de un bloque.

El siguiente es un ejemplo de un objeto literal. El primer elemento del objeto `auto` define una propiedad, `miAuto`, y le asigna una nueva cadena, "`Fiat`"; al segundo elemento, la propiedad `obtenerAuto`, se le asigna inmediatamente el resultado de invocar a la función `tiposAutos("Honda");` el tercer elemento, la propiedad `especial`, utiliza una variable (`ventas`) existente.

<InlinePlayground>

```esjs
var ventas = 'Toyota';

funcion tiposAutos(nombre) {
    si (nombre === 'Honda') {
        retornar nombre;
    } sino {
        retornar "Lo sentimos, no vendemos " + nombre + ".";
    }
}

// Objeto auto:
var auto = { 
    miAuto: 'Fiat', 
    obtenerAuto: tiposAutos('Honda'), 
    especial: ventas 
};

consola.escribir(auto.miAuto); // Fiat
consola.escribir(auto.obtenerAuto); // Honda
consola.escribir(auto.especial); // Toyota
```

</InlinePlayground>

Además, puedes utilizar un literal numérico o de cadena para el nombre de una propiedad o anidar un objeto dentro de otro. El siguiente ejemplo usa estas opciones.

<InlinePlayground>

```esjs
var auto = { 
    muchosAutos: {
        a: 'Fiat', 
        b: 'Renault'
    }, 
    7: 'Toyota'
};

consola.escribir(auto.muchosAutos.b); // Renault
consola.escribir(auto[7]); // Toyota
```

</InlinePlayground>

Los nombres de propiedad de los objetos pueden ser cualquier cadena, incluida la cadena vacía. Si el nombre de la propiedad no fuera un [identificador](https://developer.mozilla.org/es/docs/Glossary/Identifier) o un número EsJS válido, debe ir entre comillas.

No se puede acceder a los nombres de propiedad que no sean identificadores válidos como un punto (`.`), propiedad, pero _se pueden_ acceder y configurar con la notación tipo arreglo ("`[]`").

<InlinePlayground>

```esjs
var nombresPropiedadesInusuales = {
  '': 'Una cadena vacía',
  '!': '¡Bang!'
}
consola.escribir(nombresPropiedadesInusuales.'');   // SyntaxError: Cadena inesperada
consola.escribir(nombresPropiedadesInusuales['']);  // Una cadena vacía
consola.escribir(nombresPropiedadesInusuales.!);    // SyntaxError: símbolo inesperado !
consola.escribir(nombresPropiedadesInusuales['!']); // ¡Bang!
```

</InlinePlayground>

#### Objetos literales mejorados

En EsJS, los objeto literales se amplían para admitir la configuración del prototipo en la construcción, la abreviatura para asignaciones `foo: foo`, la definición de métodos, la realización de llamadas a `super` y el cálculo de nombres de propiedades con expresiones.

Juntos, estos también acercan los objetos literales y las declaraciones de clase, y permiten que el diseño basado en objetos se beneficie de algunas de las mismas conveniencias.

```esjs
var obj = {
    // __proto__
    __proto__: theProtoObj,
    // Abreviatura de "handler: handler"
    handler,
    // Métodos
    aCadena() {
     // Llamadas a super
     retornar 'd ' + super.aCadena();
    },
    // Nombres de propiedad calculados (dinámicos)
    [ 'prop_' + (() => 42)() ]: 42
};
```

### Expresiones regulares («RegExp») literales

Un expresión regular literal (que se define en detalle `más adelante`) es un patrón incluido entre barras. El siguiente es un ejemplo de una expresión regular literal.

### Cadenas literales

Una cadena literal consta de cero o más caracteres encerrados entre comillas dobles (`"`) o simples (`'`). Una cadena debe estar delimitada por comillas del mismo tipo (es decir, ambas comillas simples o, ambas comillas dobles).

Los siguientes son ejemplos de cadenas literales:

```esjs
'foo'
"bar"
'1234'
"una linea \n otra linea"
"EsJS: JavaScript con sintaxis en Español"
```

Puedes llamar a cualquiera de los métodos del objeto [`Cadena`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String) en un valor de cadena literal. EsJS automáticamente convierte la cadena literal en un objeto `Cadena` temporal, llama al método y luego descarta el objeto `Cadena` temporal. También puedes usar la propiedad `String.longitud` con una cadena literal:

<InlinePlayground>

```esjs
// Imprimirá el número de caracteres en la cadena, incluidos los espacios en blanco.
consola.escribir("EsJS: JavaScript con sintaxis en Español".longitud)  // 27.
```

</InlinePlayground>

En EsJS, también están disponibles las _plantillas literales_. Las plantillas literales están encerradas por la comilla invertida (`` ` ``) ([Acento\_grave](https://es.wikipedia.org/wiki/Acento_grave)) en lugar de comillas simples o dobles.

Las cadenas de las plantillas literales proporcionan [azúcar sintáctica](https://es.wikipedia.org/wiki/Az%C3%BAcar_sint%C3%A1ctico) para construir cadenas. (Esto es similar a las funciones de interpolación de cadenas en Perl, Python y más).

Opcionalmente, puedes agregar una etiqueta para permitirte personalizar la construcción de la cadena, evitando ataques de inyección o construyendo estructuras de datos de nivel superior a partir del contenido de la cadena.

```esjs
// Creación de cadenas literales básicas
`en EsJS '\n' es un avance de línea.`

// Cadenas multilínea
`En EsJS, las cadenas de plantilla pueden ocupar
 varias líneas, pero las cadenas entrecomillas dobles o
 simples no pueden.`

// Interpolación de cadenas
var nombre = 'Carlos', fecha = 'hoy';
`Hola ${nombre}, ¿cómo estás ${fecha}?`

// Construye un prefijo de petición HTTP utilizado para interpretar los reemplazos y la construcción
POST`http://foo.org/bar?a=${a}&b=${b}
     Content-Type: application/json
     X-Credentials: ${credenciales}
     { "foo": ${foo},
       "bar": ${bar}}`(myOnReadyStateChangeHandler);
```

Debes usar cadenas literales a menos que específicamente necesites usar un objeto `Cadena`. Consulta [`Cadena`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String) para obtener detalles sobre los objetos `Cadena`.

#### Uso de caracteres especiales en cadenas

Adicionalmente a los caracteres normales, también puedes incluir caracteres especiales en las cadenas, como muestra el siguiente ejemplo:

```esjs
"una linea \n otra linea"
```

La siguiente tabla enumera los caracteres especiales que se pueden usar en una cadena EsJS.

| Caracter | Significado                                                                                                                                                                                        |
| --- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `\0` | Byte nulo                                                                                                                                                                                          |
| `\b` | Retroceso                                                                                                                                                                                          |
| `\f` | Avance de Página                                                                                                                                                                                   |
| `\n` | Nueva Línea                                                                                                                                                                                        |
| `\r` | Retorno de carro                                                                                                                                                                                   |
| `\t` | Tabulación                                                                                                                                                                                         |
| `\v` | Tabulación vertical                                                                                                                                                                                |
| `\'` | Apóstrofo o comilla simple                                                                                                                                                                         |
| `\"` | Comilla doble                                                                                                                                                                                      |
| `\\` | Caracter de barra invertida                                                                                                                                                                        |
| `\XXX` | El carácter con la codificación Latin-1 especificada por hasta tres dígitos octales _XXX_ entre `0` y `377`. Por ejemplo, `\251` es la secuencia octal del símbolo de copyright.                   |
|  |                                                                                                                                                                                                    |
| `\xXX` | El carácter con la codificación Latin-1 especificada por los dos dígitos hexadecimales _XX_ entre `00` y `FF`. Por ejemplo, `\xA9` es la secuencia hexadecimal del símbolo de copyright.           |
|  |                                                                                                                                                                                                    |
| `\uXXXX` | El carácter Unicode especificado por los cuatro dígitos hexadecimales _XXXX_. Por ejemplo, `\u00A9` es la secuencia Unicode para el símbolo de copyright. Consulta `Secuencias de escape Unicode`. |
| `\u{XXXXX}` | El punto de código escape Unicode. Por ejemplo, `\u{2F804}` es el mismo que el escape Unicode simple `\uD87E\uDC04`.                                                                               |

#### Escapar caracteres

Para caracteres no enumerados en la tabla, la precedencia de la barra inversa es ignorada, pero su uso esta desaconsejado y se debe evitar.

Puedes insertar comillas dobles dentro de una cadena anteponiendo un carácter de barra inversa. Esto se conoce como _escapar_ las comillas. Por ejemplo:

<InlinePlayground>

```esjs
var oracion = "Él leyó \"La cremación de Sam McGee\" de R.W. Service.";
consola.escribir(oracion);
```

</InlinePlayground>

Para incluir una barra invertida literal dentro de una cadena, debes escapar el carácter de barra invertida. Por ejemplo, para asignar la ruta del archivo `c:\temp` a una cadena, usa lo siguiente:

También puedes escapar los saltos de línea precediéndolos con una barra invertida. La barra invertida y el salto de línea se eliminan del valor de la cadena.

<InlinePlayground>

```esjs
var cadena = 'esta cadena \
se divide \
en múltiples \
líneas.';

consola.escribir(cadena);   // esta cadena se divide en múltiples líneas.
```

</InlinePlayground>

Aunque EsJS no tiene sintaxis "«heredoc»" se puede acercar insertando una barra inversa y un salto de linea al final de cada linea:

<InlinePlayground>

```esjs
var poema =
'Aquí me pongo a cantar, \n\
al compás de la vigüela \n\
que el hombre que lo desvela \n\
una pena extraordinaria, \n\
como la ave solitaria \n\
con el cantar se consuela.';

consola.escribir(poema);
```

</InlinePlayground>

Tambien se dispone de [`plantillas literales` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals "Currently only available in English (US)"). Esto permite muchas nuevas funciones, ¡incluidas cadenas multilínea!

<InlinePlayground>

```esjs
var poema =
`Aquí me pongo a cantar,
al compás de la vigüela
que el hombre que lo desvela
una pena extraordinaria,
como la ave solitaria
con el cantar se consuela.`;

consola.escribir(poema);
```

</InlinePlayground>
