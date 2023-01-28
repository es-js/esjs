# Funciones

Las funciones son uno de los bloques de construcción fundamentales en EsJS. Una función en EsJS es similar a un procedimiento: **un conjunto de instrucciones que realiza una tarea o calcula un valor**.

> Aunque estrictamente hablando, para que un procedimiento califique como función, debe tomar alguna entrada y devolver una salida donde hay alguna relación obvia entre la entrada y la salida.

Para usar una función, debes definirla en algún lugar del ámbito desde el que deseas llamarla.

## Definir funciones

### Declaración de función

Una **definición de función** (también denominada **declaración de función** o **expresión de función**) consta de la palabra clave `funcion`, seguida de:

-   El nombre de la función.
-   Una lista de parámetros (o argumentos) de la función, entre paréntesis y separados por comas: `(parametro1, parametro2, ..., parametroN)`.
-   Las declaraciones de EsJS que definen la función, encerradas entre llaves: `{ ... }`.

Por ejemplo, el siguiente código define una función simple llamada `cuadrado`:

<InlinePlayground>

```esjs
funcion cuadrado(numero) {
  retornar numero * numero;
}

consola.escribir(cuadrado(3));
```

</InlinePlayground>

La función `cuadrado` toma un parámetro, llamado `numero`. La función consta de una declaración que dice que devuelva el parámetro de la función (es decir, `numero`) multiplicado por sí mismo. La instrucción `retornar` especifica el valor devuelto por la función: `retornar numero * numero `.

Los parámetros primitivos (como `Cadena`, `Numero`, `Booleano`, etc.) se pasan a las funciones **por valor**; el valor se pasa a la función, pero si la función cambia el valor del parámetro, **este cambio no se refleja globalmente ni en la función que llama**.

En cambio, los objetos (es decir, un valor no primitivo, como [`Arreglo`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array) o un objeto definido por el usuario) se pasan a las funciones **por referencia**; una referencia al objeto se pasa a la función, y si la función cambia las propiedades del objeto, **ese cambio es visible fuera de la función**, como se muestra en el siguiente ejemplo:

<InlinePlayground>

```esjs
funcion miFuncion(elObjeto) {
  elObjeto.marca = 'Toyota';
}

var miAuto = { marca: 'Honda', modelo: 'Accord', año: 1998 };
var x, y;

x = miAuto.marca; // x obtiene el valor "Honda"

miFuncion(miAuto); // miFuncion modifica el valor de la propiedad "marca"

y = miAuto.marca; // y obtiene el valor "Toyota"

consola.escribir('x: ' + x);
consola.escribir('y: ' + y);
```

</InlinePlayground>

### Expresiones `funcion`

Si bien la declaración de función anterior sintácticamente es una declaración, las funciones también se pueden crear mediante una `expresión funcion`.

Esta función puede ser **anónima**; no tiene por qué tener un nombre. Por ejemplo, la función `cuadrado` se podría haber definido como:

<InlinePlayground>

```esjs
const calcularCuadrado = funcion (numero) {
  retornar numero * numero;
};
var x = calcularCuadrado(4); // x obtiene el valor 16
consola.escribir(x);
```

</InlinePlayground>

Sin embargo, _puedes_ proporcionar un nombre con una expresión `funcion`. Proporcionar un nombre permite que la función se refiera a sí misma y también facilita la identificación de la función en el seguimiento de la pila de un depurador:

<InlinePlayground>

```esjs
const factorial = funcion fac(n) {
  retornar n < 2 ? 1 : n * fac(n - 1);
};

consola.escribir(factorial(5));
```

</InlinePlayground>

Las expresiones `funcion` son convenientes cuando se pasa una función como argumento a otra función. El siguiente ejemplo muestra una función `mapa` que debería recibir una función como primer argumento y un arreglo como segundo argumento.

<InlinePlayground>

```esjs
funcion mapa(f, a) {
  var resultado = []; // Crea un nuevo arreglo
  var i; // Declara una variable
  para (i = 0; i < a.longitud; i++) {
    resultado[i] = f(a[i]);
  }
  retornar resultado;
}

funcion formatearMensaje(cadena) {
  consola.depurar(cadena);
  retornar cadena.convertirAMayusculas();
}

consola.escribir(
  mapa(formatearMensaje, ['Hola', 'mundo', 'desde', 'EsJS'])
)
```

</InlinePlayground>

En EsJS, una función se puede definir según una condición. Por ejemplo, la siguiente definición de función define `miFuncion` solo si `num` es igual a `0`:

```esjs
var miFuncion;
si (num === 0) {
  miFuncion = funcion (elObjeto) {
    elObjeto.marca = "Toyota";
  };
}
```

Además de definir funciones como se describe aquí, también puedes usar el constructor [`Funcion`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function) para crear funciones a partir de una cadena en tiempo de ejecución, muy al estilo de [`eval()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval "Currently only available in English (US)").

Un **método** es una función que es propiedad de un objeto. Obten más información sobre objetos y métodos en [`Trabajar con objetos (WIP)`](/wip).

## Llamar funciones

_Definir_ una función no la _ejecuta_. Definirla simplemente nombra la función y especifica qué hacer cuando se llama a la función.

**Llamar** a la función en realidad lleva a cabo las acciones especificadas con los parámetros indicados. Por ejemplo, si defines la función `cuadrado`, podrías llamarla de la siguiente manera:

```esjs
cuadrado(5);
```

La declaración anterior llama a la función con un argumento de `5`. La función ejecuta sus declaraciones y devuelve el valor `25`.

Las funciones deben estar _dentro del ámbito_ cuando se llaman, pero la declaración de la función se puede elevar (cuando aparece debajo de la llamada en el código), como en este ejemplo:

<InlinePlayground>

```esjs
consola.escribir(cuadrado(5));
/* ... */
funcion cuadrado(n) {
  retornar n * n;
}
```

</InlinePlayground>

> **Nota:** Esto solo funciona cuando se define la función usando la sintaxis anterior (es decir, `funcion nombreFuncion() {}`). 
> 
> El siguiente código no funcionará. Esto significa que la elevación de función solo funciona con _declaraciones_ de función, no con _expresiones_ de función.
> ```esjs
> consola.escribir(cuadrado) // cuadrado se eleva con un valor inicial indefinido.
> consola.escribir(cuadrado(5)) // Error de tipo no detectado: cuadrado no es una función
> const cuadrado = funcion(n) {
>     retornar n * n;
> }
> ```
> Para más detalles, ver: [Elevación de función](/avanzado/elevacion#elevacion-de-funcion).

El ámbito de una función es la función en la que se declara (o el programa completo, si se declara en el nivel superior).

### Argumentos

Los argumentos de una función no se limitan a cadenas y números, también puedes pasar objetos completos a una función.

### Recursividad

Una función se puede llamar a sí misma. Por ejemplo, aquí hay una función que calcula factoriales de forma recursiva:

<InlinePlayground>

```esjs
funcion factorial(n) {
  si (n === 0 || n === 1) {
    retornar 1;
  } sino {
    retornar n * factorial(n - 1); // Llamada recursiva
  }
}

// Luego, podrías calcular los factoriales de 1 a 5 de la siguiente manera:

consola.escribir(factorial(1)); // Muestra el valor 1
consola.escribir(factorial(2)); // Muestra el valor 2
consola.escribir(factorial(3)); // Muestra el valor 6
consola.escribir(factorial(4)); // Muestra el valor 24
consola.escribir(factorial(5)); // Muestra el valor 120
```

</InlinePlayground>

Hay otras formas de llamar funciones. A menudo hay casos en los que una función se tiene que llamar dinámicamente, o el número de argumentos de una función varía, o en los que el contexto de la llamada a la función se tiene que establecer en un determinado objeto específico en tiempo de ejecución.

Resulta que las _funciones en sí mismas son objetos_ y, a su vez, estos objetos tienen métodos. (Consulta el objeto [`Funcion`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function)). Uno de estos, el método [`aplicar()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function/apply), se puede utilizar para lograr este objetivo.

## Ámbito de `funcion`

No se puede acceder a las variables definidas dentro de una función desde cualquier lugar fuera de la función, porque la variable se define solo en el ámbito de la función. Sin embargo, una función puede acceder a todas las variables y funciones definidas dentro del ámbito en el que está definida.

En otras palabras, una función definida en el ámbito global puede acceder a todas las variables definidas en el ámbito global. Una función definida dentro de otra función también puede acceder a todas las variables definidas en su función principal y a cualquier otra variable a la que tenga acceso la función principal.

<InlinePlayground>

```esjs
// Las siguientes variables se definen en el ámbito global
global num1 = 20,
       num2 = 3,
       nombre = "Messi";

// Esta función está definida en el ámbito global
funcion multiplicar() {
  retornar num1 * num2;
}

consola.escribir(multiplicar()); // Muestra 60

// Un ejemplo de función anidada
funcion obtenerPuntaje() {
  var num1 = 2,
      num2 = 3;

  funcion anotar() {
    retornar nombre + " anotó " + (num1 + num2);
  }

  retornar anotar();
}

consola.escribir(obtenerPuntaje()); // Muestra "Messi anotó 5"
```

</InlinePlayground>

## Ámbito y la pila de funciones

### Recursión

Una función se puede referir y llamarse a sí misma. Hay tres formas de que una función se refiera a sí misma:

1.  El nombre de la función
2.  `argumentos.llamado`
3.  Una variable dentro del ámbito que se refiere a la función

Por ejemplo, considera la siguiente definición de función:

```esjs
var foo = funcion bar() {
  // las instrucciones van aquí
};
```

Dentro del cuerpo de la función, todos los siguientes son equivalentes:

1.  `bar()`
2.  `argumentos.llamado()`
3.  `foo()`

Una función que se llama a sí misma se conoce como una _función recursiva_. En cierto modo, la recursividad es análoga a un bucle. Ambas ejecutan el mismo código varias veces y ambas requieren una condición (para evitar un bucle infinito, o más bien, una recursividad infinita en este caso).

Por ejemplo, el siguiente bucle...

```esjs
var x = 0;
mientras (x < 10) {
  // "x < 10" es la condición del bucle
  // hacer cosas
  x++;
}
```

...se puede convertir en una declaración de función recursiva, seguida de una llamada a esa función:

```esjs
funcion bucle(x) {
  si (x >= 10)
    // "x >= 10" es la condición de salida (equivalente a "!(x < 10)")
    retornar;
  // hacer cosas
  bucle(x + 1); // la llamada recursiva
}
bucle(0);
```

Sin embargo, algunos algoritmos no pueden ser simples bucles iterativos. Por ejemplo, obtener todos los nodos de una estructura de árbol (como [DOM (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model "Currently only available in English (US)")) es más fácil a través de la recursividad:

```esjs
funcion recorrerArbol(nodo) {
  si (nodo == null) {
    // ...
    retornar;
  }
  // Hacer algo con el nodo
  para (var i = 0; i < nodo.nodosDescendientes.longitud; i++) {
    recorrerArbol(nodo.nodosDescendientes[i]);
  }
}
```

En comparación con la función `bucle`, cada llamada recursiva en sí misma hace muchas llamadas recursivas aquí.

Es posible convertir cualquier algoritmo recursivo en uno no recursivo, pero la lógica suele ser mucho más compleja, y hacerlo requiere el uso de una pila.

De hecho, la recursividad en sí misma usa una pila: la pila de funciones. El comportamiento similar a una pila se puede ver en el siguiente ejemplo:

<InlinePlayground>

```esjs
funcion foo(i) {
  si (i < 0) retornar;
  consola.escribir("inicio: " + i);
  foo(i - 1);
  consola.escribir("fin: " + i);
}
foo(3);

// Produce:

// inicio: 3
// inicio: 2
// inicio: 1
// inicio: 0
// fin: 0
// fin: 1
// fin: 2
// fin: 3
```

</InlinePlayground>

### Funciones anidadas y cierres

Puedes anidar una función dentro de otra función. La función anidada (interna) es privada de su función contenedora (externa).

También forma un _cierre_. Un cierre es una expresión (comúnmente, una función) que puede tener variables libres junto con un entorno que une esas variables (que "cierra" la expresión).

Dado que una función anidada es un cierre, significa que una función anidada puede "heredar" los argumentos y variables de su función contenedora. En otras palabras, la función interna contiene el ámbito de la función externa.

Para resumir:

-   Solo se puede acceder a la función interna desde declaraciones en la función externa.
-   La función interna forma un cierre: la función interna puede usar los argumentos y variables de la función externa, mientras que la función externa no puede usar los argumentos y variables de la función interna.

El siguiente ejemplo muestra funciones anidadas:

```esjs
funcion sumarCuadrados(a, b) {
  funcion cuadrado(x) {
    retornar x * x;
  }
  retornar cuadrado(a) + cuadrado(b);
}
a = sumarCuadrados(2, 3); // devuelve 13
b = sumarCuadrados(3, 4); // devuelve 25
c = sumarCuadrados(4, 5); // devuelve 41
```

Dado que la función interna forma un cierre, puedes llamar a la función externa y especificar argumentos tanto para la función externa como para la interna:

```esjs
funcion afuera(x) {
  funcion adentro(y) {
    retornar x + y;
  }
  retornar adentro;
}
fn_adentro = afuera(3); // Piensa en ello como: dame una función que agregue 3 a lo que sea que le des
// eso
resultado = fn_adentro(5); // devuelve 8

resultado1 = afuera(3)(5); // devuelve 8
```

### Preservación de variables

Observa cómo se conserva `x` cuando se devuelve `adentro`. Un cierre debe conservar los argumentos y variables en todos los ámbitos a los que hace referencia. Dado que cada llamada proporciona argumentos potencialmente diferentes, se crea un nuevo cierre para cada llamada a `afuera`. La memoria se puede liberar solo cuando el `adentro` devuelto ya no es accesible.

Esto no es diferente de almacenar referencias en otros objetos, pero a menudo es menos obvio porque uno no establece las referencias directamente y no las puede inspeccionar.

### Funciones multianidadas

Las funciones se pueden anidar de forma múltiple. Por ejemplo:

-   Una función (`A`) contiene una función (`B`), que a su vez contiene una función (`C`).
-   Ambas funciones `B` y `C` forman cierres aquí. Por tanto, `B` puede acceder a `A` y `C` puede acceder a `B`.
-   Además, dado que `C` puede acceder a `B` que puede acceder a `A`, `C` también puede acceder a `A`.

Por tanto, los cierres pueden contener múltiples ámbitos; contienen de forma recursiva el ámbito de las funciones que la contienen. Esto se llama _encadenamiento de alcance_. (La razón por la que se llama "encadenamiento" se explica más adelante).

Considera el siguiente ejemplo:

```esjs
funcion A(x) {
  funcion B(y) {
    funcion C(z) {
      consola.escribir(x + y + z);
    }
    C(3);
  }
  B(2);
}
A(1); // registra 6 (1 + 2 + 3)
```

En este ejemplo, `C` accede a `y` de `B` y a `x` de `A`.

Esto se puede hacer porque:

1.  `B` forma un cierre que incluye a `A` (es decir, `B` puede acceder a los argumentos y variables de `A`).
2.  `C` forma un cierre que incluye a `B`.
3.  Debido a que el cierre de `B` incluye a `A`, el cierre de `C` incluye a `A`, `C` puede acceder a los argumentos _y variables_ de `B` _y_ de `A`. En otras palabras, `C` _encadena_ los ámbitos de `B` y `A`, _en ese orden_.

Sin embargo, lo contrario no es cierto. `A` no puede acceder a `C`, porque `A` no puede acceder a ningún argumento o variable de `B`, del que `C` es una variable. Por lo tanto, `C` permanece privado solo para `B`.

### Conflictos de nombres

Cuando dos argumentos o variables en el ámbito de un cierre tienen el mismo nombre, hay un _conflicto de nombres_. Tiene más prioridad el ámbito anidado. Entonces, el ámbito más interno tiene la mayor prioridad, mientras que el ámbito más externo tiene la más baja. Esta es la cadena de ámbito. El primero de la cadena es el ámbito más interno y el último es el ámbito más externo. Considera lo siguiente:

```esjs
funcion afuera() {
  var x = 5;
  funcion adentro(x) {
    retornar x * 2;
  }
  retornar adentro;
}

afuera()(10); // devuelve 20 en lugar de 10
```

El conflicto de nombre ocurre en la declaración `retornar x` y está entre el parámetro `x` de `adentro` y la variable `x` de `afuera`. La cadena de ámbito aquí es {`adentro`, `afuera`, objeto global}. Por lo tanto, `x` de `adentro` tiene precedencia sobre `x` de `afuera` y `20` (`x`) de `adentro` se devuelve en lugar de `10` (`x` de `afuera`).

## Cierres

Los cierres son una de las características más poderosas de EsJS. EsJS permite el anidamiento de funciones y otorga a la función interna acceso completo a todas las variables y funciones definidas dentro de la función externa (y todas las demás variables y funciones a las que la función externa tiene acceso).

Sin embargo, la función externa _no_ tiene acceso a las variables y funciones definidas dentro de la función interna. Esto proporciona una especie de encapsulación para las variables de la función interna.

Además, dado que la función interna tiene acceso a el ámbito de la función externa, las variables y funciones definidas en la función externa vivirán más que la duración de la ejecución de la función externa, si la función interna logra sobrevivir más allá de la vida de la función externa. Se crea un cierre cuando la función interna de alguna manera se pone a disposición de cualquier ámbito fuera de la función externa.

<InlinePlayground>

```esjs
var mascota = funcion (nombre) {
  // La función externa define una variable llamada "nombre"
  var obtenerNombre = funcion () {
    // La función interna tiene acceso a la variable "nombre" de la función externa
    retornar nombre;
  };
  retornar obtenerNombre; // Devuelve la función interna, exponiéndola así a ámbitos externos
};

const miMascota = mascota("Lucy");

consola.escribir(miMascota()); // Muestra "Lucy"
```

</InlinePlayground>

Puede ser mucho más complejo que el código anterior. Se puede devolver un objeto que contiene métodos para manipular las variables internas de la función externa.

<InlinePlayground>

```esjs
var crearMascota = funcion (nombre) {
  var sexo;

  retornar {
    establecerNombre: funcion (nuevoNombre) {
      nombre = nuevoNombre;
    },

    obtenerNombre: funcion () {
      retornar nombre;
    },

    obtenerSexo: funcion () {
      retornar sexo;
    },

    establecerSexo: funcion (nuevoSexo) {
      si (
        tipoDe nuevoSexo === "string" &&
        (nuevoSexo.convertirAMinusculas() === "macho" || nuevoSexo.convertirAMinusculas() === "hembra")
      ) {
        sexo = nuevoSexo;
      }
    },
  };
};

var mascota = crearMascota("Lucy");
consola.escribir(mascota.obtenerNombre()); // Lucy

mascota.establecerNombre("Charly");
mascota.establecerSexo("macho");
consola.escribir(mascota.obtenerSexo()); // macho
consola.escribir(mascota.obtenerNombre()); // Charly
```

</InlinePlayground>

En el código anterior, la variable `nombre` de la función externa es accesible para las funciones internas, y no hay otra forma de acceder a las variables internas excepto a través de las funciones internas. Las variables internas de las funciones internas actúan como almacenes seguros para los argumentos y variables externos. Contienen datos "persistentes" y "encapsulados" para que trabajen las funciones internas. Las funciones ni siquiera tienen que estar asignadas a una variable o tener un nombre.

<InlinePlayground>

```esjs
var obtenerCodigo = (funcion () {
  var apiCodigo = "0]Eal(eh&2"; // Un código que no queremos que los externos puedan modificar...

  retornar funcion () {
    retornar apiCodigo;
  };
})();

consola.escribir(obtenerCodigo()); // Devuelve el apiCodigo
```

</InlinePlayground>

> **Nota:** **Precaución** ¡Hay una serie de cosas a tener en cuenta al usar cierres!
> 
> Si una función encerrada define una variable con el mismo nombre que una variable en el ámbito externo, entonces no hay forma de hacer referencia a la variable en el ámbito externo nuevamente. (La variable de ámbito interno "anula" la externa, hasta que el programa sale de el ámbito interno).
> 
> ```esjs
> var crearMascota = funcion (nombre) {
>   // La función externa define una variable llamada "nombre".
>   retornar {
>     establecerNombre: funcion (nombre) {
>       // La función envolvente también define una variable llamada "nombre".
>       nombre = nombre; // ¿Cómo accedemos al "nombre" definido por la función externa?
>     },
>   };
> };
> ```

## Usar el objeto `argumentos`

Los `argumentos` de una función se establecen en un objeto similar a un arreglo. Dentro de una función, puedes abordar los argumentos que se le pasan de la siguiente manera:

```esjs
argumentos[i];
```

donde `i` es el número ordinal del argumento, comenzando en `0`. Entonces, el primer argumento que se pasa a una función sería `argumentos[0]`. El número total de argumentos se indica mediante `argumentos.longitud`.

Usando el objeto `argumentos`, puedes llamar a una función con más argumentos de los que formalmente declara aceptar. Esto suele ser útil si no sabes de antemano cuántos argumentos se pasarán a la función. Puedes usar `argumentos.longitud` para determinar el número de argumentos que realmente se pasan a la función, y luego acceder a cada argumento usando el objeto `argumentos`.

Por ejemplo, considera una función que concatena varias cadenas. El único argumento formal para la función es una cadena que especifica los caracteres que separan los elementos a concatenar. La función se define de la siguiente manera. Puedes pasar cualquier número de argumentos a esta función, y concatena cada argumento en una "lista" de cadenas:

<InlinePlayground>

```esjs
funcion miConcatenacion(separador) {
  var resultado = ""; // inicia lista
  var i;
  // itera a través de argumentos
  para (i = 1; i < arguments.longitud; i++) {
    resultado += arguments[i] + separador;
  }
  retornar resultado;
}

// devuelve "rojo, naranja, azul, "
consola.escribir(miConcatenacion(", ", "rojo", "naranja", "azul"));

// devuelve "elefante; jirafa; leon; puma"
consola.escribir(miConcatenacion("; ", "elefante", "jirafa", "leon", "puma"));

// devuelve "savia. albahaca. orégano. pimienta. perejil. "
consola.escribir(miConcatenacion(". ", "salvia", "albahaca", "orégano", "pimienta", "perejil"));
```

</InlinePlayground>



> **Nota:** La variable `argumentos` es "similar a un arreglo", pero no es un arreglo. Es similar a un arreglo en el sentido de que tiene un índice numerado y una propiedad `longitud`. Sin embargo, _no_ posee todos los métodos de manipulación de arreglos.

Consulta el objeto [`Funcion`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function) en la referencia de EsJS para obtener más información.

## Parámetros de función

Existen dos nuevos tipos de parámetros: _parámetros predeterminados_ y _parámetros resto_.

### Parámetros predeterminados

En EsJS, los parámetros de las funciones están predeterminados en `indefinido`. Sin embargo, en algunas situaciones puede resultar útil establecer un valor predeterminado diferente. Esto es exactamente lo que hacen los parámetros predeterminados.

#### Sin parámetros predeterminados

Otra estrategia para establecer valores predeterminados, es evaluar los valores de los parámetros en el cuerpo de la función y asignar un valor si son `indefinido`.

En el siguiente ejemplo, si no se proporciona ningún valor para `b`, su valor sería `indefinido` al evaluar `a * b`, y una llamada a `multiplicar` normalmente habría devuelto `NeN`. Sin embargo, esto se evita con la segunda línea de este ejemplo:

```esjs
funcion multiplicar(a, b) {
  b = tipoDe b !== "undefined" ? b : 1;

  retornar a * b;
}

multiplicar(5); // 5
```

#### Con parámetros predeterminados

Con _parámetros predeterminados_, no es necesaria una verificación manual en el cuerpo de la función. Simplemente puedes poner `1` como valor predeterminado para `b` en el encabezado de la función:

```esjs
funcion multiplicar(a, b = 1) {
  retornar a * b;
}

multiplicar(5); // 5
```

Para obtener más detalles, consulta `parámetros predeterminados` en la referencia.

### Parámetros `resto`

La sintaxis del `parámetro resto` nos permite representar un número indefinido de argumentos como un arreglo.

En el siguiente ejemplo, la función `multiplicar` usa _parámetros `resto`_ para recopilar argumentos desde el segundo hasta el final. Luego, la función los multiplica por el primer argumento.

```esjs
funcion multiplicar(multiplicador, ...losArgumentos) {
  retornar losArgumentos.mapa((x) => multiplicador * x);
}

var arr = multiplicar(2, 1, 2, 3);
consola.escribir(arr); // [2, 4, 6]
```

## Funciones Flecha

Una `expresión de función flecha` tiene una sintaxis más corta en comparación con las expresiones de función y no tiene su propio `ambiente`, `argumentos`, `super` o `new.target`. Las funciones flecha siempre son anónimas. Consulta también esta publicación del blog hacks.mozilla.org: "[ES6 en profundidad: funciones flecha](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/)".

Las Funciones Flecha proporcionan  _funciones más cortas_ y _no vinculantes_ de `ambiente`.

### Funciones más cortas

En algunos patrones funcionales, las funciones más cortas son bienvenidas. Compara:

```esjs
var a = ["Hidrógeno", "Helio", "Litio", "Berilio"];

var a2 = a.mapa(funcion (s) {
  retornar s.longitud;
});

consola.escribir(a2); // muestra [8, 6, 7, 9]

var a3 = a.mapa((s) => s.longitud);

consola.escribir(a3); // muestra [8, 6, 7, 9]
```

### Sin `ambiente` separado

Hasta las funciones flecha, cada nueva función definía su propio valor `ambiente` (un nuevo objeto en el caso de un constructor, indefinido en llamadas a funciones en [`modo estricto`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Strict_mode), el objeto base si la función se llama como un "método de objeto", etc.). Esto resultó ser poco menos que ideal con un estilo de programación orientado a objetos.

```esjs
funcion Persona() {
  // El constructor Persona() define `ambiente` como él mismo.
  ambiente.edad = 0;

  establecerIntervalo(funcion crecer() {
    // En modo no estricto, la función crecer() define `ambiente`
    // como el objeto global, que es diferente del `ambiente`
    // definido por el constructor Persona().
    ambiente.edad++;
  }, 1000);
}

var p = new Persona();
```

En ECMAScript 3/5, este problema se solucionó asignando el valor en `ambiente` a una variable que se podría cerrar.

```esjs
funcion Persona() {
  global esteOtro = este;
  // Elige uno y se congruente.
  esteOtro.edad = 0;

  establecerIntervalo(funcion crecer() {
    // La retrollamada se refiere a la variable `esteOtro` de la cual
    // el valor es el objeto esperado.
    esteOtro.edad++;
  }, 1000);
}
```

Alternativamente, podrías crear una `función vinculada` para que el valor `ambiente` adecuado se pasara a la función `crecer()`.

Una función flecha no tiene su propio `ambiente` se utiliza el valor de `ambiente` del contexto de ejecución adjunto. Por lo tanto, en el siguiente código, `ambiente` dentro de la función que se pasa a `establecerIntervalo` tiene el mismo valor que `ambiente` en la función adjunta:

```esjs
funcion Persona() {
  ambiente.edad = 0;

  establecerIntervalo(() => {
    ambiente.edad++; // En este caso, "ambiente" se refier al ámbito de la función "Persona"
  }, 1000);
}

var p = new Persona();
```

## Funciones predefinidas

EsJS tiene integradas varias funciones de nivel superior:

`eval()`

El método **`eval()`** evalúa el código JavaScript representado como una cadena.

`uneval()`

El método **`uneval()`** crea una representación de cadena del código fuente de un [`Object`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object).

`isFinite()`

La función global **`isFinite()`** determina si el valor pasado es un número finito. Si es necesario, el parámetro, primero se convierte en un número.

`isNaN()`

La función **`isNaN()`** determina si un valor es `NeN` o no. **Nota**: La coerción dentro de la función `isNaN` tiene `interesantes` reglas; también puedes querer usar [`Number.isNaN()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN), como se define en ECMAScript 2015, o puedes usar `tipoDe` para determinar si el valor no es un número (`NeN`).

`parseFloat()`

La función **`parseFloat()`** procesa un argumento de cadena y devuelve un número de punto flotante.

`parseInt()`

La función **`parseInt()`** procesa un argumento de cadena y devuelve un número entero de la base especificada (la base en los sistemas numéricos matemáticos).

`decodeURI()`

La función **`decodeURI()`** decodifica un identificador uniforme de recursos (URI) creado previamente por `encodeURI` o por una rutina similar.

`decodeURIComponent()`

El método **`decodeURIComponent()`** decodifica un componente Identificador uniforme de recursos (URI) creado previamente por `encodeURIComponent` o por un rutina similar.

`encodeURI()`

El método **`encodeURI()`** codifica un identificador uniforme de recursos (URI) reemplazando cada instancia de ciertos caracteres por una, dos, tres o cuatro secuencias de escape que representan la codificación UTF-8 del caracter (solo habrá cuatro secuencias de escape para caracteres compuestos por dos caracteres "sustitutos").

`encodeURIComponent()`

El método **`encodeURIComponent()`** codifica un componente Identificador uniforme de recursos (URI) reemplazando cada instancia de ciertos caracteres por una, dos, tres o cuatro secuencias de escape que representan la codificación UTF-8 del caracter (solo habrá cuatro secuencias de escape para caracteres compuestos por dos caracteres "sustitutos").

`escape()`

El método obsoleto **`escape()`** calcula una nueva cadena en la que ciertos caracteres han sido reemplazados por una secuencia de escape hexadecimal. En su lugar usa `encodeURI` o `encodeURIComponent`.

`unescape()`

El método obsoleto **`unescape()`** calcula una nueva cadena en la que las secuencias de escape hexadecimales se reemplazan con el caracter que representan. Las secuencias de escape se pueden introducir por medio de una función como `escape`. Debido a que `unescape()` está en desuso, usa `decodeURI()` o `decodeURIComponent` en su lugar.
