# Número

El tipo de dato `Numero` representa un valor numérico. Los números pueden ser enteros o decimales; positivos o negativos.

```esjs
var x = 1;

var y = 1.5;

var z = -1;
```

## Objeto `Numero` (Number)

El objeto `Numero` es un objeto contenedor para un valor de tipo número. Cuando se crea un objeto `Numero`, se puede pasar un valor de tipo numero o un valor de tipo cadena. Si el valor es de tipo cadena, se intentará convertir a un número. Si el valor no puede ser convertido a un número, se asignará el valor `NeN`.

El objeto `Numero` tiene métodos y propiedades que permiten trabajar con números.

### Propiedades

| Propiedad                  | Descripción                                |
|----------------------------|--------------------------------------------|
| `Numero.MAX_VALUE`         | El valor máximo que un número puede tener. |
| `Numero.MIN_VALUE`         | El valor mínimo que un número puede tener. |
| `Numero.NEGATIVE_INFINITY` | El valor de -Infinito.                     |
| `Numero.POSITIVE_INFINITY` | El valor de +Infinito.                     |
| `Numero.NeN`               | El valor de NeN.                           |

### Métodos

| Método                              | Descripción                                                         |
|-------------------------------------|---------------------------------------------------------------------|
| `Numero.esFinito(x)`                | Devuelve `verdadero` si `x` es un número finito.                    |
| `Numero.esEntero(x)`                | Devuelve `verdadero` si `x` es un número entero.                    |
| `Numero.NeN(x)`                     | Devuelve `verdadero` si `x` es NeN.                                 |
| `Numero.esEnteroSeguro(x)`          | Devuelve `verdadero` si `x` es un número entero seguro.             |
| `Numero.interpretarDecimal(cadena)` | Devuelve el valor que representa `cadena` como un número decimal.   |
| `Numero.interpretarEntero(cadena)`  | Devuelve el valor que representa `cadena` como un número entero.    |
| `x.aExponencial()`                  | Devuelve el número `x` en formato exponencial.                      |
| `x.fijarDecimales(n)`               | Devuelve el número `x` con un número fijo de decimales (`n`).       |
| `x.aCadenaLocalizado(formato)`      | Devuelve el número `x` en formato de cadena localizado (`formato`). |
| `Numero.aPrecision(x)`              | Devuelve el número `x` en formato de precisión.                     |
| `x.aCadena()`                       | Devuelve el número `x` en formato de cadena.                        |
| `x.valorDe()`                       | Devuelve el valor del número `x`.                                   |

## Objeto `Mate` (Math)

El objeto `Mate` es un objeto global que tiene propiedades y métodos para constantes y funciones matemáticas.

### Constantes

| Constante      | Valor                                                   |
|----------------|---------------------------------------------------------|
| `Mate.E`       | La constante de Euler, `e`, aproximadamente `2.718`     |
| `Mate.LN2`     | El logaritmo natural de 2, aproximadamente `0.693`      |
| `Mate.LN10`    | El logaritmo natural de 10, aproximadamente `2.303`     |
| `Mate.LOG2E`   | El logaritmo de `e` en base 2, aproximadamente `1.443`  |
| `Mate.LOG10E`  | El logaritmo de `e` en base 10, aproximadamente `0.434` |
| `Mate.PI`      | El número pi, aproximadamente `3.141`                   |
| `Mate.SQRT1_2` | La raíz cuadrada de 1/2, aproximadamente `0.707`        |
| `Mate.SQRT2`   | La raíz cuadrada de 2, aproximadamente `1.414`          |

### Métodos

| Método                              | Descripción                                                               |
|-------------------------------------|---------------------------------------------------------------------------|
| `Mate.absoluto(x)`                  | Devuelve el valor absoluto de `x`                                         |
| `Mate.arcocoseno(x)`                | Devuelve el arco coseno de `x`, en radianes                               |
| `Mate.arcocosenoHiperbolico(x)`     | Devuelve el arco coseno hiperbólico de `x`, en radianes                   |
| `Mate.arcoseno(x)`                  | Devuelve el arco seno de `x`, en radianes                                 |
| `Mate.arcosenoHiperbolico`          | Devuelve el arco seno hiperbólico de `x`, en radianes                     |
| `Mate.arcotangente(x)`              | Devuelve el arco tangente de `x`, en radianes                             |
| `Mate.arcotangente2(y, x)`          | Devuelve el arco tangente de `y/x`, en radianes                           |
| `Mate.arcotangenteHiperbolica(x)`   | Devuelve el arco tangente hiperbólica de `x`, en radianes                 |
| `Mate.coseno(x)`                    | Devuelve el coseno de `x` (x está en radianes)                            |
| `Mate.cosenoHiperbolico(x)`         | Devuelve el coseno hiperbólico de `x`                                     |
| `Mate.tangente(x)`                  | Devuelve la tangente de `x` (x está en radianes)                          |
| `Mate.tangenteHiperbolica(x)`       | Devuelve la tangente hiperbólica de `x`                                   |
| `Mate.exponencial(x)`               | Devuelve `e` elevado a la `x` potencia                                    |
| `Mate.exponencialMenos1(x)`         | Devuelve `e` elevado a la `x` potencia menos 1                            |
| `Mate.floor(x)`                     | Devuelve el entero más grande menor o igual que `x`                       |
| `Mate.hipotenusa(x1, x2, ...)`      | Devuelve la hipotenusa de una lista de argumentos                         |
| `Mate.logaritmo(x)`                 | Devuelve el logaritmo natural (en base `e`) de `x`                        |
| `Mate.logaritmoBase10(x)`           | Devuelve el logaritmo en base 10 de `x`                                   |
| `Mate.logaritmoDe1Mas(x)`           | Devuelve el logaritmo natural (en base `e`) de `1 + x`                    |
| `Mate.logaritmoBase2(x)`            | Devuelve el logaritmo en base 2 de `x`                                    |
| `Mate.maximo(x, y, ...)`            | Devuelve el número más grande de una lista de argumentos                  |
| `Mate.minimo(x, y, ...)`            | Devuelve el número más pequeño de una lista de argumentos                 |
| `Mate.potencia(x, y)`               | Devuelve el valor de `x` elevado a la `y` potencia                        |
| `Mate.raizCuadrada(x)`              | Devuelve la raíz cuadrada de `x`                                          |
| `Mate.raizCubica(x)`                | Devuelve la raíz cúbica de `x`                                            |
| `Mate.redondear(x)`                 | Devuelve el valor de `x` redondeado al entero más cercano                 |
| `Mate.redondearHaciaAbajo(x)`       | Devuelve el entero más pequeño mayor o igual que `x`                      |
| `Mate.redondearHaciaArriba(x)`      | Devuelve el entero más grande menor o igual que `x`                       |
| `Mate.redondearAComaFlotante(x)`    | Devuelve la representación de coma flotante de `x`                        |
| `Mate.seno(x)`                      | Devuelve el seno de `x` (x está en radianes)                              |
| `Mate.senoHiperbolico(x)`           | Devuelve el seno hiperbólico de `x`                                       |
| `Mate.signo(x)`                     | Devuelve el signo de `x` (-1 si es negativo, 0 si es 0, 1 si es positivo) |
| `Mate.multiplicacionEntera(x, y)`   | Devuelve el resultado de multiplicar `x` y `y` como enteros sin signo     |
| `Mate.aleatorio()`                  | Devuelve un número pseudoaleatorio entre 0 y 1                            |
| `Mate.truncar(x)`                   | Devuelve la parte entera de `x`, eliminando cualquier fracción            |
| `Mate.cerosALaIzquierdaEn32Bits(x)` | Devuelve el número de ceros a la izquierda en el número de 32 bits de `x` |


