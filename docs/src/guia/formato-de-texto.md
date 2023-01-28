# Formato de texto

Esta sección presenta cómo trabajar con cadenas de caracteres (`Cadena`) y texto en EsJS.

## Cadenas de caracteres (`Cadena`)

El tipo [Cadena](https://developer.mozilla.org/es/docs/Glossary/String) de EsJS se utiliza para representar datos textuales. Es un conjunto de "elementos" de valores enteros sin signo de 16 bits (unidades de código UTF-16). Cada elemento de la cadena de caracteres ocupa una posición en la cadena. El primer elemento está en el índice 0, el siguiente en el índice 1, y así sucesivamente. La longitud de una cadena es el número de elementos que contiene. Puedes crear cadenas utilizando cadena literales u objetos **cadena**.

### Cadenas literales

Puedes crear cadenas simples utilizando comillas simples o dobles:

Se pueden crear cadenas más avanzadas usando secuencias de escape:

#### Secuencias de escape hexadecimales

El número después de \\x se interpreta como un número del [Sistema\_hexadecimal](https://es.wikipedia.org/wiki/Sistema_hexadecimal).

#### Secuencias de escape Unicode

Las secuencias de escape Unicode requieren al menos cuatro dígitos hexadecimales después de `\u`.

#### Puntos de escape de código Unicode

Nuevo en ECMAScript 2015. Con el código de puntos de escape Unicode, cualquier carácter se puede escapar usando números hexadecimales para que sea posible usar puntos de código Unicode hasta `0x10FFFF`. Con simples escapes Unicode, a menudo es necesario escribir las mitades sustitutas por separado para lograr el mismo resultado.

Consulta también [`String.fromCodePoint()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) o [`String.prototype.codePointAt()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt).

```esjs
'\u{2F804}'

// lo mismo con los escapes Unicode simples
'\uD87E\uDC04'
```

### [Objetos `Cadena`](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Text_formatting#objetos_string)

El objeto [`Cadena`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String) es una envoltura alrededor del tipo de dato primitivo `string`.

```esjs
const foo = crear Cadena('foo'); // Crea un objeto String
consola.escribir(foo);           // Muestra: [String: 'foo']
typeof foo;                      // Devuelve 'object'
```

Puedes llamar a cualquiera de los métodos del objeto `Cadena` en un valor de cadena literal: EsJS automáticamente convierte la cadena literal en un objeto `Cadena` temporal, llama al método y luego descarta el objeto `Cadena` temporal. También puedes usar la propiedad `String.length` con una cadena literal:

Debes usar cadenas literales a menos que necesites específicamente usar un objeto `Cadena`, porque los objetos `Cadena` pueden tener un comportamiento contrario a la intuición. Por ejemplo:

```esjs
const firstString = '2 + 2';              // Crea un valor de cadena literal
const secondString = crear Cadena('2 + 2'); // Crea un objeto String
eval(firstString);                        // Devuelve el número 4
eval(secondString);                       // Devuelve la cadena "2 + 2"
```

Un objeto `Cadena` tiene una propiedad, `length`, que indica el número de unidades de código UTF-16 en la cadena. Por ejemplo, el siguiente código asigna a `helloLength` el valor 13, porque "¡Hola, mundo!" tiene 13 caracteres, cada uno representado por una unidad de código UTF-16. Puedes acceder a cada unidad de código utilizando la notación de corchete de los arreglos. No puedes cambiar caracteres individuales porque las cadenas son objetos inmutables similares a los arreglos:

```
const hello = '¡Hola, mundo!';
const helloLength = hello.length;
hello[0] = 'L'; // Esto no tiene ningún efecto, porque las cadenas son inmutables
hello[1];       // Esto devuelve "H"
```

Los caracteres cuyos valores escalares Unicode son mayores que U+FFFF (tal como algunos caracteres chinos/japoneses/coreanos/vietnamitas raros y algunos «emoji»s) se almacenan en UTF-16 con dos unidades de código sustituto cada uno. Por ejemplo, una cadena que contenga el caracter único U+1F600 "Cara sonriente de emoji" tendrá una longitud de 2. El acceso a las unidades de código individual en una cadena de este tipo utilizando corchetes puede tener consecuencias indeseables, como la formación de cadenas con diferentes unidades de código suplente, violando el estándar Unicode. (Se deben agregar ejemplos a esta página después de que se corrija el error MDN [error 857438](https://bugzilla.mozilla.org/show_bug.cgi?id=857438)). Consulta también [`String.fromCodePoint()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) o [`String.prototype.codePointAt()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt).

Un objeto `Cadena` tiene una variedad de métodos: por ejemplo, aquellos que devuelven una variación de la cadena en sí, como `substring` y `toUpperCase`.

La siguiente tabla resume los métodos de los objetos [`Cadena`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String).

| Método | Descripción                                                                                                                                          |
| --- |------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`charAt`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/charAt), [`charCodeAt`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt), [`codePointAt`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) | Devuelve el caracter o código de caracter en la posición especificada en la cadena.                                                                  |
| [`indexOf`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf), [`lastIndexOf`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf) | Devuelve la posición de la subcadena especificada en la cadena o la última posición de la subcadena especificada, respectivamente.                   |
| [`startsWith`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith), [`endsWith`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith), [`includes`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/includes) | Devuelve si o no la cadena comienza, termina o contiene una subcadena especificada.                                                                  |
| [`concat`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/concat) | Combina el texto de dos cadenas y devuelve una nueva cadena.                                                                                         |
| [`fromCharCode`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode), [`fromCodePoint`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) | Construye una cadena a partir de la secuencia especificada de valores Unicode. Este es un método de la clase `Cadena`, no una instancia de `Cadena`. |
| [`split`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/split) | Divide un objeto `Cadena` en un arreglo de cadenas separando la cadena en subcadenas.                                                                |
| [`slice`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/slice) | Extrae una sección de una cadena y devuelve una nueva cadena.                                                                                        |
| [`substring`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/substring), [`substr`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/substr) | Devuelve el subconjunto especificado de la cadena, ya sea especificando los índices inicial y final o el índice inicial y una longitud.              |
| [`match`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/match), [`matchAll`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll), [`replace`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/replace), [`replaceAll` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll "Currently only available in English (US)"), [`search`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/search) | Trabaja con expresiones regulares.                                                                                                                   |
| [`toLowerCase`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase), [`toUpperCase`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) | Devuelve la cadena en minúsculas o mayúsculas, respectivamente.                                                                                      |
| [`normalize`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) | Devuelve la forma de normalización Unicode del valor de la cadena llamada.                                                                           |
| [`repeat`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/repeat) | Devuelve una cadena que consta de los elementos del objeto repetidos las veces indicadas.                                                            |
| [`trim`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) | Recorta los espacios en blanco desde el principio y el final de la cadena.                                                                           |

### Plantillas literales multilínea

Las [`plantillas literales` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals "Currently only available in English (US)") son cadena literales que permiten expresiones incrustadas. Puedes utilizar cadenas de varias líneas y funciones de interpolación de cadenas con ellas.

Las plantillas literales están encerradas por el carácter (` `` `) ([acento grave](https://es.wikipedia.org/wiki/Acento_grave)) en lugar de comillas simples o dobles. Las plantillas literales pueden contener marcadores de posición. Estos se indican mediante el signo de dólar y llaves (`${expresión}`).

#### Multilíneas

Cualquier caracter de nueva línea insertado en la fuente es parte de la plantilla literal. Usando cadenas normales, tendrías que usar la siguiente sintaxis para obtener cadenas multilínea:

```esjs
consola.escribir('cadena de texto línea 1\n\
cadena de texto línea 2');
// "cadena de texto línea 1
// cadena de texto línea 2"
```

Para obtener el mismo efecto con cadenas multilínea, ahora puedes escribir:

```esjs
consola.escribir(`cadena de texto línea 1
cadena de texto línea 2`);
// "cadena de texto línea 1
// cadena de texto línea 2"
```

#### Expresiones incrustadas

Para incrustar expresiones dentro de cadenas normales, usarías la siguiente sintaxis:

```esjs
const five = 5;
const ten = 10;
consola.escribir('Quince es ' + (five + ten) + ' y no ' + (2 * five + ten) + '.');
// "Quince es 15 y no 20."
```

Ahora, con las plantillas literales, puedes hacer uso del azúcar sintáctica haciendo que las sustituciones como esta sean más legibles:

```esjs
const five = 5;
const ten = 10;
consola.escribir (`Quince es ${five + ten} y no ${2 * five + ten}.`);
// "Quince es 15 y no 20."
```

Para obtener más información, lee acerca de [`plantillas literales` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals "Currently only available in English (US)") en la [`Referencia de JavaScript`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference).

## Internacionalización

El objeto [`Intl`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl) es el espacio de nombres para la API de internacionalización de ECMAScript, que proporciona comparación de cadenas sensible al idioma, formato de números y formato de fecha y hora. Los constructores de los objetos [`Collator` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator "Currently only available in English (US)"), [`NumberFormat` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat "Currently only available in English (US)") y [`DateTimeFormat` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat "Currently only available in English (US)") son propiedades del objeto `Intl`.

### Formato de fecha y hora

El objeto [`DateTimeFormat` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat "Currently only available in English (US)") es útil para formatear la fecha y la hora. El siguiente formato es una fecha para el Inglés como se usa en los Estados Unidos. (El resultado es diferente en otra zona horaria).

```esjs
const milisegundosPorDia = 24 * 60 * 60 * 1000;

// July 17, 2014 00:00:00 UTC.
const julio172014 = new Date(milisegundosPorDia * (44 * 365 + 11 + 197));

const opciones = { year: '2-digit', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
const zonaHorariaArgentina = new Intl.DateTimeFormat('es-AR', opciones).format;

consola.escribir(zonaHorariaArgentina(julio172014)); // 16/07/14, 21:00 ART
```

### Formato de número

El objeto [`NumberFormat` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat "Currently only available in English (US)") es útil para formatear números, por ejemplo, monedas.

```esjs
const gasPrice = new Intl.NumberFormat('en-US',
                        { style: 'currency', currency: 'USD',
                          minimumFractionDigits: 3 });

consola.escribir(gasPrice.format(5.259)); // $5.259

const hanDecimalRMBInChina = new Intl.NumberFormat('zh-CN-u-nu-hanidec',
                        { style: 'currency', currency: 'CNY' });

consola.escribir(hanDecimalRMBInChina.format(1314.25)); // ￥ 一,三一四.二五
```

### [Colación](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Text_formatting#colaci%C3%B3n)

El objeto [`Collator` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator "Currently only available in English (US)") es útil para comparar y ordenar cadenas.

Por ejemplo, en realidad hay dos órdenes de clasificación diferentes en Alemán, «_phonebook_» y «_dictionary_». La clasificación «_phonebook_» enfatiza el sonido, y es como si "ä", "ö", etc. se expandieran a "ae", "oe", etc. antes de la clasificación.

```esjs
const names = ['Hochberg', 'Hönigswald', 'Holzman'];

const germanPhonebook = new Intl.Collator('de-DE-u-co-phonebk');

// como ordenando ["Hochberg", "Hoenigswald", "Holzman"]:
consola.escribir(names.sort(germanPhonebook.compare).join(', '));
// registra "Hochberg, Hönigswald, Holzman"
```

Algunas palabras alemanas se conjugan con diéresis adicionales, por lo que en los diccionarios es sensato ordenar ignorando diéresis (excepto cuando se ordenan palabras que difieren _solo_ por las diéresis: «_schon_» antes de «_schön_»).

```esjs
const germanDictionary = new Intl.Collator('de-DE-u-co-dict');

// como si ordenara ["Hochberg", "Honigswald", "Holzman"]:
consola.escribir(names.sort(germanDictionary.compare).join(', '));
// registra "Hochberg, Holzman, Hönigswald"
```

Para obtener más información sobre la API de [`Intl`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl), consulta también la [Introducción a la API de internacionalización de JavaScript](https://hacks.mozilla.org/2014/12/introducing-the-javascript-internationalization-api/).
