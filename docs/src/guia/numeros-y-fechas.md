# Números y fechas

Esta sección presenta los conceptos, objetos y funciones que se utilizan para trabajar y realizar cálculos utilizando números y fechas en EsJS. Esto incluye el uso de números escritos en varias bases, incluyendo decimal, binario y hexadecimal, así como el uso del objeto global [`Mate`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math) para realizar una amplia variedad de operaciones matemáticas con números.

## Números

En EsJS, los números se implementan en [Formato en coma flotante de doble precisión](https://es.wikipedia.org/wiki/Formato_en_coma_flotante_de_doble_precisi%C3%B3n) de 64 bits IEEE 754 (es decir, un número entre ±2−1022 y ±2+1023, o aproximadamente ±10−308 a ±10+308, con una precisión numérica de 53 bits). Los valores enteros hasta ±253 - 1 se pueden representar con exactitud.

Además de poder representar números de punto flotante, el tipo `numero` tiene tres valores simbólicos: `+`[`Infinito`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Infinity), `-`[`Infinito`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Infinity) y [`NeN`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/NaN) (_No-es-Número_, no es un número). Equivale a `NaN` (_Not-a-Number_) en JavaScript.

También existe el tipo [`EnteroGrande` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt "Currently only available in English (US)") que te permite representar números enteros que pueden ser muy grandes. Sin embargo, existen advertencias para usar `EnteroGrande`; por ejemplo, no puedes mezclar y hacer coincidir los valores `EnteroGrande` y [`Numero`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number) en la misma operación, y no puedes usar el objeto [`Mate`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math) con valores `EnteroGrande`.

Puedes utilizar cuatro tipos de literales numéricos: decimal, binario, octal y hexadecimal.

### Números decimales

```esjs
1234567890
42

// Precaución al usar ceros a la izquierda:

0888 // 888 procesado como decimal
0777 // procesado como octal en modo no estricto (511 en decimal)
```

Ten en cuenta que los decimales literales pueden comenzar con un cero (`0`) seguido de otro dígito decimal, pero si cada dígito después del `0` inicial es menor que 8, el número se procesa como un número octal.

### Números binarios

La sintaxis de números binarios utiliza un cero inicial seguido de una letra "B" latina en minúscula o mayúscula (`0b` o `0B`). Si los dígitos después del `0b` no son 0 o 1, el siguiente `SyntaxError` se lanza un: "Faltan dígitos binarios después de 0b".

```esjs
var FLT_SIGNBIT  = 0b10000000000000000000000000000000; // 2147483648
var FLT_EXPONENT = 0b01111111100000000000000000000000; // 2139095040
var FLT_MANTISSA = 0B00000000011111111111111111111111; // 8388607
```

### Números octales

La sintaxis de números octales utiliza un cero a la izquierda. Si los dígitos después del `0` están fuera del rango de 0 a 7, el número se interpretará como un número decimal.

```esjs
var n = 0755; // 493
var m = 0644; // 420
```

El modo estricto en ECMAScript 5 prohíbe la sintaxis octal. La notación octal no es parte de ECMAScript 5, pero la admiten todos los navegadores al poner como prefijo un cero al número: `0644 == 420` y `"\045" === "%"`. En ECMAScript 2015, los números octales son compatibles si tienen el prefijo `0o`, por ejemplo:

```esjs
var a = 0o10; // ES2015: 8
```

### Números hexadecimales

La sintaxis de números hexadecimales utiliza un cero inicial seguido de una letra "X" latina en minúscula o mayúscula (`0x` o `0X`). Si los dígitos después de `0x` están fuera del rango (0123456789ABCDEF), el siguiente `SyntaxError` se lanza: "El identificador comienza inmediatamente después del literal numérico".

```esjs
0xFFFFFFFFFFFFFFFFF // 295147905179352830000
0x123456789ABCDEF   // 81985529216486900
0XA                 // 10
```

### Exponenciación

```esjs
1E3   // 1000
2e6   // 2000000
0.1e2 // 10
```

## El objeto `Numero`

El objeto integrado [`Numero`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number) tiene propiedades para constantes numéricas, como valor máximo, `NeN` (no un número) e `infinity`. No puedes cambiar los valores de estas propiedades y las debes usar de la siguiente manera:

```esjs
var numeroMasGrande = Numero.MAX_VALUE;
var numeroMasChico = Numero.MIN_VALUE;
var numeroInfinito = Numero.POSITIVE_INFINITY;
var numeroInfinitoNegativo = Numero.NEGATIVE_INFINITY;
var noEsNumero = Numero.NeN;
```

Siempre haces referencia a una propiedad del objeto `Numero` predefinido como se muestra arriba, y no como una propiedad de un objeto `Numero` que creas tú mismo.

La siguiente tabla resume las propiedades del objeto `Numero`.

| Propiedad                                                                                                                                                                                | Descripción                                                                                                                                                                                                           |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`Numero.MAX_VALUE`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE)                                                                     | El número representable más grande (`±1.7976931348623157e+308`)                                                                                                                                                       |
| [`Numero.MIN_VALUE`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE)                                                                     | El número representable más pequeño (`±5e-324`)                                                                                                                                                                       |
| [`Numero.NaN`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN)                                                                                 | Valor especial `not a number` ("no es un número")                                                                                                                                                                     |
| [`Numero.NEGATIVE_INFINITY`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY)                                                     | Valor infinito negativo especial; devuelto por desbordamiento                                                                                                                                                         |
| [`Numero.POSITIVE_INFINITY`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)                                                     | Valor infinito positivo especial; devuelto por desbordamiento                                                                                                                                                         |
| [`Numero.EPSILON` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON "Currently only available in English (US)")                   | Diferencia entre `1` y el valor más pequeño mayor que `1` que se puede representar como un [`Numero`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number) (`2.220446049250313e-16`) |
| [`Numero.MIN_SAFE_INTEGER` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER "Currently only available in English (US)") | Número entero seguro mínimo en EsJS (−253 + 1 o `−9007199254740991`)                                                                                                                                                  |
| [`Numero.MAX_SAFE_INTEGER`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)                                                       | Máximo número entero seguro en EsJS (+253 - 1 o `+9007199254740991`)                                                                                                                                            |

| Método                                                                                                                         | Descripción                                                                                                                                                                                                                    |
|--------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`Numero.parseFloat()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat)       | Analiza un argumento de cadena y devuelve un número de punto flotante. Igual que la función [`parseFloat()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) global.                 |
| [`Numero.parseInt()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)           | Analiza un argumento de cadena y devuelve un número entero de la base o raíz especificada. Igual que la función [`parseInt()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/parseInt) global. |
| [`Numero.isFinite()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)           | Determina si el valor pasado es un número finito.                                                                                                                                                                              |
| [`Numero.isInteger()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)         | Determina si el valor pasado es un número entero.                                                                                                                                                                              |
| [`Numero.isNaN()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)                 | Determina si el valor pasado es `NeN`. Versión más robusta del `isNaN()` global original.                                                                                                                                      |
| [`Numero.isSafeInteger()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) | Determina si el valor proporcionado es un número que es un _entero seguro_.                                                                                                                                                    |

El prototipo `Numero` proporciona métodos para recuperar información de objetos `Numero` en varios formatos. La siguiente tabla resume los métodos de `Numero.prototype`.

| Método | Descripción |
| --- | --- |
| [`toExponential()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential "Currently only available in English (US)") | Devuelve una cadena que representa el número en notación exponencial. |
| [`toFixed()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) | Devuelve una cadena que representa el número en notación de punto fijo. |
| [`toPrecision()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision) | Devuelve una cadena que representa el número con una precisión especificada en notación de punto fijo. |

## El objeto `Mate`

El objeto integrado [`Mate`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math) tiene propiedades y métodos para constantes y funciones matemáticas. Por ejemplo, la propiedad `PI` del objeto `Mate` tiene el valor de `pi` (3.141...), que usarías en una aplicación como:

```esjs
Mate.PI
```

De manera similar, las funciones matemáticas estándar son métodos de `Mate`. Estas incluyen funciones trigonométricas, logarítmicas, exponenciales y otras. Por ejemplo, si deseas utilizar la función trigonométrica «seno», debes escribir:

```esjs
Mate.seno(1.56)
```

Ten en cuenta que todos los métodos trigonométricos de `Mate` toman argumentos en radianes.

La siguiente tabla resume los métodos del objeto `Mate`.

| Método                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Descripción                                                                                                                                            |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| - [`abs()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Valor absoluto                                                                                                                                         |
| - [`seno()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/sin)<br/> - [`coseno()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/cos)<br/> - [`tangente()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/tan)<br/>                                                                                                                                                                                                                                                                                                                                                                                           | Funciones trigonométricas estándar; con el argumento en radianes.                                                                                      |
| - [`arcoseno()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/asin)<br/> - [`arcocoseno()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/acos)<br/> - [`arcotangente()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/atan)<br/> - [`arcotangente2()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)<br/>                                                                                                                                                                                                                                                       | Funciones trigonométricas inversas; devuelven valores en radianes.                                                                                     |
| - [`senoHiperbolico()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh)<br/> - [`cosenoHiperbolico()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh)<br/> - [`tanh()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh)<br/>                                                                                                                                                                                                                                                                                                                                                                | Funciones hiperbólicas; argumento en ángulo hiperbólico.                                                                                               |
| - [`arcosenoHiperbolico()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh)<br/> - [`arcocosenoHiperbolico()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh)<br/> - [`arcotangenteHiperbolica()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh)<br/>                                                                                                                                                                                                                                                                                                                                        | Funciones hiperbólicas inversas; devuelven valores en ángulo hiperbólico.                                                                              |
| - [`potencia()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/pow)<br/> - [`exponencial()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/exp)<br/> - [`exponencialMenos1()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1)<br/> - [`logaritmoBase10()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/log10)<br/> - [`logaritmoDe1Mas()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log1p)<br/> - [`logaritmoBase2()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/log2)<br/> | Funciones exponenciales y logarítmicas.                                                                                                                |
| - [`redondearHaciaAbajo()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)<br/> - [`redondearHaciaArriba()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)<br/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Devuelve el entero más grande/más pequeño menor/mayor o igual que un argumento.                                                                        |
| - [`minimo()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/min)<br/> - [`maximo()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/max)<br/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Devuelven el valor mínimo o máximo (respectivamente) de una lista de números separados por comas como argumentos.                                      |
| - [`aleatorio()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random)<br/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Devuelve un número aleatorio entre 0 y 1.                                                                                                              |
| - [`redondear()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/round)<br/> - [`redondearAComaFlotante()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround)<br/> - [`truncar()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc)<br/>                                                                                                                                                                                                                                                                                                                                                             | Funciones de redondeo y truncamiento.                                                                                                                  |
| - [`raizCuadrada()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt)<br/> - [`raizCubica()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt)<br/> - [`hipotenusa()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot)<br/>                                                                                                                                                                                                                                                                                                                                                                         | Raíz cuadrada, raíz cúbica, raíz cuadrada de la suma de argumentos cuadrados.                                                                          |
| - [`signo()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/sign)<br/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | El signo de un número, que indica si el número es positivo, negativo o cero.                                                                           |
| - [`cerosALaIzquierdaEn32Bits()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32)<br/> - [`multiplicacionEntera()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul)<br/>                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Número de bits cero iniciales en la representación binaria de 32 bits. El resultado de la multiplicación de 32 bits similar a C de los dos argumentos. |

A diferencia de muchos otros objetos, nunca creas un objeto `Mate` propio. Siempre usas el objeto `Mate` incorporado.

## El objeto `Fecha`

EsJS no tiene un tipo de dato para fechas. Sin embargo, puedes utilizar el objeto [`Fecha`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date) y sus métodos para trabajar con fechas y horas en tus aplicaciones. El objeto `Fecha` tiene una gran cantidad de métodos para establecer, obtener y manipular fechas. Pero no tiene propiedades.

EsJS/JavaScript maneja las fechas de manera similar a Java. Los dos lenguajes tienen muchos de los mismos métodos de fecha, y ambos lenguajes almacenan fechas como el número de milisegundos desde el 1 de enero de 1970, 00:00:00, con una marca de tiempo Unix que es el número de segundos desde el 1 de enero de 1970, 00: 00:00.

El rango del objeto `Fecha` es de -100,000,000 de días a 100,000,000 de días en relación con el 1 de enero de 1970 UTC.

Para crear un objeto `Fecha`:

```esjs
var nombreFecha = crear Fecha([parametros]);
```

donde `nombreFecha` es el nombre del objeto `Fecha` que se está creando; puede ser un objeto nuevo o una propiedad de un objeto existente.

Llamar a `Fecha` sin la palabra clave `crear` devuelve una cadena que representa la fecha y hora actuales.

Los parámetros de la sintaxis anterior pueden ser cualquiera de los siguientes:

-   Nada: crea la fecha y hora de hoy. Por ejemplo, `hoy = crear Fecha();`.
-   Una cadena que representa una fecha en la siguiente forma: "Mes día, año horas:minutos:segundos." Por ejemplo, `var Xmas95 = crear Fecha("December 25, 1995 13:30:00")`. Si omites horas, minutos o segundos, el valor se establecerá en cero.
-   Un conjunto de valores enteros para año, mes y día. Por ejemplo, `var Xmas95 = crear Fecha(1995, 11, 25)`.
-   Un conjunto de valores enteros para año, mes, día, hora, minuto y segundos. Por ejemplo, `var Xmas95 = crear Fecha(1995, 11, 25, 9, 30, 0)`.

### Métodos del objeto `Fecha`

Los métodos del objeto `Fecha` para manejar fechas y horas se incluyen en estas categorías generales:

-   métodos establecedores ("`establecer`"), para configurar valores de fecha y hora en objetos `Fecha`.
-   Métodos captadores ("`obtener`"), para obtener valores de fecha y hora de objetos `Fecha`.
-   métodos conversores ("`a`"), para devolver valores de cadena de objetos `Fecha`.
-   métodos `interpretar` y `UTC`, para analizar cadenas de `Fecha`.

Con los métodos "`obtener`" y "`establecer`" puedes obtener y establecer segundos, minutos, horas, día del mes, día de la semana, meses y años por separado. Existe un método `getDay` que devuelve el día de la semana, pero no existe el método `setDay` correspondiente, porque el día de la semana se establece automáticamente. Estos métodos utilizan números enteros para representar estos valores de la siguiente manera:

-   Segundos y minutos: 0 a 59
-   Horas: 0 a 23
-   Día: 0 (Domingo) a 6 (Sábado)
-   Fecha: 1 al 31 (día del mes)
-   Meses: 0 (Enero) a 11 (Diciembre)
-   Año: años desde 1900

Por ejemplo, supongamos que defines la siguiente fecha:

```esjs
var Xmas95 = crear Fecha('December 25, 1995');
```

Entonces, `Xmas95.getMonth()` devuelve 11 y `Xmas95.getFullYear()` devuelve 1995.

Los métodos `getTime` y `setTime` son útiles para comparar fechas. El método `getTime` devuelve el número de milisegundos desde el 1 de enero de 1970, 00:00:00 para un objeto `Fecha`.

Por ejemplo, el siguiente código muestra el número de días que quedan en el año actual:

```esjs
var hoy = crear Fecha();
var endYear = crear Fecha(1995, 11, 31, 23, 59, 59, 999); // Establece día y mes
endYear.setFullYear(hoy.getFullYear()); // Establece año a este año
var msPerDay = 24 * 60 * 60 * 1000; // Número de milisegundos por día
var daysLeft = (endYear.getTime() - hoy.getTime()) / msPerDay;
var daysLeft = Mate.round(daysLeft); // devuelve los días que quedan en el año
```

Este ejemplo crea un objeto `Fecha` llamado `hoy` que contiene la fecha de hoy. Luego crea un objeto `Fecha` llamado `endYear` y establece el año en el año actual. Luego, usando la cantidad de milisegundos por día, calcula la cantidad de días entre `hoy` y `endYear`, usando `getTime` y redondeando a un número entero de días.

El método `interpretar` es útil para asignar valores de cadenas de fecha a objetos `Fecha` existentes. Por ejemplo, el siguiente código usa `interpretar` y `setTime` para asignar un valor de fecha al objeto `IPOdate`:

```esjs
var IPOdate = crear Fecha();
IPOdate.setTime(Date.parse('Aug 9, 1995'));
```

### [Ejemplo](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Numbers_and_dates#ejemplo)

En el siguiente ejemplo, la función `JSClock()` devuelve la hora en el formato de un reloj digital.

```esjs
function JSClock() {
  var time = crear Fecha();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  var temp = '' + ((hour > 12) ? hour - 12 : hour);
  if (hour == 0)
    temp = '12';
  temp += ((minute < 10) ? ':0' : ':') + minute;
  temp += ((second < 10) ? ':0' : ':') + second;
  temp += (hour >= 12) ? ' P.M.' : ' A.M.';
  return temp;
}
```

La función `JSClock` primero crea un nuevo objeto `Fecha` llamado `time`; dado que no se dan argumentos, la hora se crea con la fecha y hora actuales. Luego, las llamadas a los métodos `getHours`, `getMinutes` y `getSeconds` asignan el valor de la hora, minuto y segundo actuales a `hour`, `minute` y `second`.

Las siguientes cuatro declaraciones crean un valor de cadena basado en el tiempo. La primera declaración crea una variable `temp`, asignándole un valor mediante una expresión condicional; si `hour` es mayor que 12, (`hour - 12`), de lo contrario, simplemente hora, a menos que la hora sea 0, en cuyo caso se convierte en 12.

La siguiente declaración agrega un valor de `minute` a `temp`. Si el valor de `minute` es menor que 10, la expresión condicional agrega una cadena con un cero precedente; de lo contrario, agrega una cadena con dos puntos de demarcación. Luego, una declaración agrega un valor de segundos a `temp` de la misma manera.

Finalmente, una expresión condicional agrega "P.M." a `temp` si `hour` es 12 o mayor; de lo contrario, agrega "A.M." a `temp`.
