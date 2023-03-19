# Cadena (String)

Una cadena es una secuencia de caracteres. En EsJS, las cadenas se declaran utilizando comillas simples o dobles:

```esjs
var x = 'Hola mundo';

var y = "Hola mundo";
```

## Objeto Cadena (String object)

En EsJS, las cadenas son objetos. Esto significa que las cadenas tienen propiedades y métodos.

### Propiedades

| Propiedad  | Descripción               |
|------------|---------------------------|
| `longitud` | La longitud de la cadena. |


### Métodos

| Método                                         | Descripción                                                                                                                                                                                                      |
|------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `miCadena.enPosicion(n)`                       | Devuelve el carácter en la posición `n` de `miCadena`.                                                                                                                                                           |
| `miCadena.caracterEn(n)`                       | Devuelve el carácter en la posición `n` de `miCadena`.                                                                                                                                                           |
| `miCadena.codigoDeCaracterEn(n)`               | Devuelve el código de carácter en la posición `n` de `miCadena`.                                                                                                                                                 |
| `miCadena.puntoDeCodigoEn(n)`                  | Devuelve el punto de código en la posición `n` de `miCadena`.                                                                                                                                                    |
| `miCadena.concatenar(cadena)`                  | Devuelve una nueva cadena que es el resultado de concatenar la cadena actual (`miCadena`) con la cadena pasada como parámetro.                                                                                   |
| `miCadena.terminaCon(cadena)`                  | Devuelve `true` si la cadena actual (`miCadena`) termina con la cadena pasada como parámetro.                                                                                                                    |
| `miCadena.desdeCodigoDeCaracter(c)`            | Devuelve una nueva cadena que es el resultado de convertir el código de carácter pasado como parámetro a una cadena.                                                                                             |
| `miCadena.desdePuntoDeCodigo(c)`               | Devuelve una nueva cadena que es el resultado de convertir el punto de código pasado como parámetro a una cadena.                                                                                                |
| `miCadena.incluye(cadena)`                     | Devuelve `true` si `miCadena` incluye la cadena pasada como parámetro.                                                                                                                                           |
| `miCadena.indiceDe(cadena)`                    | Devuelve el índice de la primera ocurrencia de la cadena pasada como parámetro.                                                                                                                                  |
| `miCadena.ultimoIndiceDe(cadena)`              | Devuelve el índice de la última ocurrencia de la cadena pasada como parámetro.                                                                                                                                   |
| `miCadena.compararLocalizada(cadena)`          | Devuelve `true` si la cadena actual (`miCadena`) es igual a la cadena pasada como parámetro.                                                                                                                     |
| `miCadena.coincidir(cadena)`                   | Devuelve `true` si la cadena actual (`miCadena`) es igual a la cadena pasada como parámetro.                                                                                                                     |
| `miCadena.coincidirTodo(cadena)`               | Devuelve `true` si la cadena actual (`miCadena`) es igual a la cadena pasada como parámetro.                                                                                                                     |
| `miCadena.normalizar()`                        | Devuelve una nueva cadena que es el resultado de normalizar la cadena actual (`miCadena`).                                                                                                                       |
| `miCadena.rellenarAlFinal(cadena)`             | Devuelve una nueva cadena que es el resultado de rellenar la cadena actual (`miCadena`) con la cadena pasada como parámetro hasta alcanzar la longitud especificada.                                             |
| `miCadena.rellenarAlComienzo(cadena)`          | Devuelve una nueva cadena que es el resultado de rellenar la cadena actual (`miCadena`) con la cadena pasada como parámetro hasta alcanzar la longitud especificada.                                             |
| `miCadena.crudo()`                             | Devuelve una nueva cadena que es el resultado de escapar los caracteres especiales de la cadena actual (`miCadena`).                                                                                             |
| `miCadena.repetir(n)`                          | Devuelve una nueva cadena que es el resultado de repetir la cadena actual (`miCadena`) `n` veces.                                                                                                                |
| `miCadena.reemplazar(busqueda, reemplazo)`     | Devuelve una nueva cadena que es el resultado de reemplazar la primera ocurrencia de la cadena pasada como primer parámetro por la cadena pasada como segundo parámetro.                                         |
| `miCadena.reemplazarTodo(busqueda, reemplazo)` | Devuelve una nueva cadena que es el resultado de reemplazar todas las ocurrencias de la cadena pasada como primer parámetro por la cadena pasada como segundo parámetro.                                         |
| `miCadena.buscar(cadena)`                      | Devuelve el índice de la primera ocurrencia de la cadena pasada como parámetro.                                                                                                                                  |
| `miCadena.recortar(n)`                         | Devuelve una nueva cadena que es el resultado de recortar la cadena actual (`miCadena`) a la longitud especificada.                                                                                              |
| `miCadena.dividir(cadena)`                     | Devuelve un arreglo de cadenas que es el resultado de dividir la cadena actual (`miCadena`) en subcadenas utilizando la cadena pasada como parámetro como separador.                                             |
| `miCadena.comienzaCon(cadena)`                 | Devuelve `true` si la cadena comienza con la cadena pasada como parámetro.                                                                                                                                       |
| `miCadena.subcadena(desde, hasta)`             | Devuelve una nueva cadena que es el resultado de extraer una subcadena de la cadena actual (`miCadena`), desde la posición indicada por el primer parámetro hasta la posición indicada por el segundo parámetro. |
| `miCadena.aMinusculasLocalizada()`             | Devuelve una nueva cadena que es el resultado de convertir la cadena actual (`miCadena`) a minúsculas.                                                                                                           |
| `miCadena.aMayusculasLocalizada()`             | Devuelve una nueva cadena que es el resultado de convertir la cadena actual (`miCadena`) a mayúsculas.                                                                                                           |
| `miCadena.aMinusculas()`                       | Devuelve una nueva cadena que es el resultado de convertir la cadena actual (`miCadena`) a minúsculas.                                                                                                           |
| `miCadena.aMayusculas()`                       | Devuelve una nueva cadena que es el resultado de convertir la cadena actual (`miCadena`) a mayúsculas.                                                                                                           |
| `miCadena.aCadena()`                           | Devuelve una nueva cadena que es el resultado de convertir la cadena actual (`miCadena`) a cadena.                                                                                                               |
| `miCadena.recortarEspaciosAlFinal()`           | Devuelve una nueva cadena que es el resultado de recortar los espacios al final de la cadena actual (`miCadena`).                                                                                                |
| `miCadena.recortarEspaciosAlFinal()`           | Devuelve una nueva cadena que es el resultado de recortar los espacios al comienzo de la cadena actual (`miCadena`).                                                                                             |
| `miCadena.recortarEspaciosAlComienzo()`        | Devuelve una nueva cadena que es el resultado de recortar los espacios al comienzo de la cadena actual (`miCadena`).                                                                                             |
| `miCadena.valorDe()`                           | Devuelve el valor de la cadena actual (`miCadena`).                                                                                                                                                              |
