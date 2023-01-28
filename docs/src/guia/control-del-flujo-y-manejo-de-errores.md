# Control del flujo y manejo de errores

EsJs admite un compacto conjunto de declaraciones, específicamente declaraciones de control de flujo, que puedes utilizar para incorporar una gran cantidad de interactividad en tu aplicación. Esta sección proporciona una descripción de estas declaraciones.

## Declaración de bloque

La declaración más básica es una _declaración de bloque_, que se utiliza para agrupar instrucciones. El bloque está delimitado por un par de llaves:

```esjs
{
  declaracion_1;
  declaracion_2;
  ⋮
  declaracion_n;
}
```

Las declaraciones de bloque se utilizan comúnmente con declaraciones de control de flujo (`si`, `para`, `mientras`).

#### Ejemplo

El siguiente ejemplo comienza declarando una variable `x` con el valor `0`. Luego, mientras `x` sea menor que `10`, ejecuta el bloque de declaración del buclie `mientras`, de manera que muestra en la consola los 10 números del Sistema Decimal:

<InlinePlayground>

```esjs
var x = 0;
mientras (x < 10) {
  consola.escribir(x);
  x = x + 1; // Aumenta el valor de "x" para la siguiente iteración
}
```

</InlinePlayground>

En este ejemplo, la declaración de bloque es lo que está entre llaves: 

```esjs 
{
  consola.escribir(x);
  x = x + 1; // Aumenta el valor de "x" para la siguiente iteración
}
``` 

## Expresiones condicionales

Una expresión condicional es un conjunto de instrucciones que se ejecutarán si una condición especificada es verdadera. EsJS admite dos expresiones condicionales: `si...sino` y `elegir`.

### Expresión `si...sino`

Utiliza la expresión `si` para ejecutar una instrucción si una condición lógica es `verdadero`. Utiliza la cláusula opcional `sino` para ejecutar una instrucción si la condición es `falso`.

Una declaración `si` se ve así:

```esjs
si (condicion) {
  declaracion_1;
} sino {
  declaracion_2;
}
```

Aquí, la `condicion` puede ser cualquier expresión que se evalúe como `verdadero` o `falso`. (Consulta `Booleano` para obtener una explicación de lo que se evalúa como `verdadero` y `falso`).

Si `condicion` se evalúa como `verdadero`, se ejecuta `declaracion_1`. De lo contrario, se ejecuta `declaracion_2`. 

`declaracion_1` y `declaracion_2` pueden ser cualquier declaración, incluidas otras declaraciones `si` anidadas.

También puedes componer las declaraciones usando `sino si` para que se prueben varias condiciones en secuencia, de la siguiente manera:

```esjs
si (condition_1) {
  declaracion_1;
} sino si (condition_2) {
  declaracion_2;
} sino si (condition_n) {
  declaracion_n;
} sino {
  declaracion_last;
}
```

En el caso de múltiples condiciones, solo se ejecutará la primera condición lógica que se evalúe como `verdadero`.

> **Nota: Mejores prácticas:** Aunque es posible, _no_ es aconsejable utilizar asignaciones simples en una expresión condicional, porque la asignación se puede confundir con la igualdad al mirar el código.
> 
> Por ejemplo, _no_ escribas un código como este:
> 
> <InlinePlayground>
>
> ```esjs
> // Propenso a ser mal interpretado como "x == 1"
> var x = 0;
> si (x = 1) {
>   consola.escribir('X es igual a: ' + x);
> }
> ```
> 
> </InlinePlayground>
>
> Si necesitas usar una tarea en una expresión condicional, una práctica común es poner paréntesis adicionales alrededor de la asignación, así:
> 
> <InlinePlayground>
>
> ```esjs
> // Propenso a ser mal interpretado como "x == 1"
> var x = 0;
> si ((x = 1)) {
>   consola.escribir('X es igual a: ' + x);
> }
> ```
> 
> </InlinePlayground>
>
> O mejor aún, mueve la expresión de asignación afuera de la expresión `si`, y sólo utiliza expresiones condicionales:
> 
> <InlinePlayground>
>
> ```esjs
> var x = 0;
> x = 1
> si (x === 0) {
>   consola.escribir('Esto no se ejecuta, ya que x es igual a 1');
> } sino {
>   consola.escribir('X es igual a: ' + x);
> }
> ```
>
> </InlinePlayground>

#### Valores falsos

Los siguientes valores se evalúan como `falso` (también conocidos como valores [Falsy (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Falsy "Currently only available in English (US)"):

-   `falso`
-   `indefinido`
-   `nulo`
-   `0`
-   `NeN`
-   la cadena vacía (`""`)

Todos los demás valores, incluidos todos los objetos, se evalúan como `verdadero` cuando se pasan a una declaración condicional.

> **Nota:** **Precaución**: ¡No confundas los valores booleanos primitivos `verdadero` y `falso` con los valores `verdadero` y `falso` del objeto [`Booleano`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Boolean)!. Por ejemplo:
> <InlinePlayground>
> 
> ```esjs
> var b = crear Booleano(falso);
> si (b) { // esta condición se evalúa como verdadero
>   consola.escribir('Primera declaración');
> }
> si (b == true) { // esta condición se evalúa como falso
>   consola.escribir('Segunda declaración');
> }
> ```
> 
> </InlinePlayground>


##### Ejemplo

En el siguiente ejemplo, la función `comprobarDato` devuelve `verdadero` si el número de caracteres del objeto `Cadena` es igual a 3 (tres). De lo contrario, muestra una alerta y devuelve `falso`.

<InlinePlayground>

```esjs
funcion comprobarDato(valorIngresado) {
  si (valorIngresado.longitud == 3) {
    retornar verdadero;
  } sino {
    consola.advertencia(
      "Introduce exactamente tres caracteres. " +
        `${valorIngresado} no es válido.`
    );
    retornar falso;
  }
}

consola.escribir('abc:');
consola.escribir(comprobarDato('abc'));

consola.escribir('hola:');
consola.escribir(comprobarDato('hola'));
```

</InlinePlayground>

### Declaración `elegir`

Una instrucción `elegir` permite que un programa evalúe una expresión e intente hacer coincidir el valor de la expresión con una etiqueta `caso`. Si la encuentra, el programa ejecuta la declaración asociada.

Una instrucción `elegir` se ve así:

```esjs
elegir (expresion) {
  caso etiqueta_1:
    declaraciones_1
    [romper;]
  caso etiqueta_2:
    declaraciones_2
    [romper;]
  …
  porDefecto:
    declaraciones_porDefecto
    [romper;]
}
```

EsJS evalúa la instrucción `elegir` anterior de la siguiente manera:

-   El programa primero busca una cláusula `caso` con una etiqueta que coincida con el valor de expresión y luego transfiere el control a esa cláusula, ejecutando las declaraciones asociadas.
-   Si no se encuentra una etiqueta coincidente, el programa busca la cláusula opcional `porDefecto`:
    -   Si se encuentra una cláusula `porDefecto`, el programa transfiere el control a esa cláusula, ejecutando las declaraciones asociadas.
    -   Si no se encuentra una cláusula `porDefecto`, el programa reanuda la ejecución en la declaración que sigue al final de `elegir`.
    -   (Por convención, la cláusula `porDefecto` está escrita como la última cláusula, pero no es necesario que sea así).

#### Declaraciones `romper`

La declaración opcional `romper` asociada con cada cláusula `caso` asegura que el programa salga de `elegir` una vez que se ejecuta la instrucción coincidente, y luego continúa la ejecución en la declaración que sigue a `elegir`. Si se omite `romper`, el programa continúa la ejecución dentro de la instrucción `elegir` (y evaluará el siguiente `caso`, y así sucesivamente).

##### Ejemplo

En el siguiente ejemplo, si `tipoDeFruta` se evalúa como '`Bananas`', el programa hace coincidir el valor con el caso '`Bananas`' y ejecuta la declaración asociada. Cuando se encuentra `romper`, el programa sale del `elegir` y continúa la ejecución de la instrucción que sigue a `elegir`. Si se omitiera `romper`, también se ejecutará la instrucción para `caso 'Cerezas'`.

<InlinePlayground>

```esjs
var tipoDeFruta = 'Mangos';

elegir (tipoDeFruta) {
  caso "Naranjas":
    consola.escribir("Las naranjas cuestan $59 el kilo");
    romper;
  caso "Manzanas":
    consola.escribir("Las manzanas cuestan $32 el kilo");
    romper;
  caso "Bananas":
    consola.escribir("Los plátanos cuestan $48 el kilo");
    romper;
  caso "Cerezas":
    consola.escribir("Las cerezas cuestan $123 el kilo");
    romper;
  caso "Mangos":
    consola.escribir("Los mangos cuestan $56 el kilo");
    romper;
  caso "Papayas":
    consola.escribir("Los mangos y las papayas cuestan $2.79 el kilo");
    romper;
  porDefecto:
    consola.escribir(`Lo sentimos, no tenemos ${tipoDeFruta}.`);
}

consola.escribir("¿Hay algo más que quieras?");
```

</InlinePlayground>

## Expresiones de manejo de excepciones

Puedes lanzar excepciones usando la instrucción `lanzar` y manejarlas usando las declaraciones `intentar...lanzar`.

-   [Expresión lanzar](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#expresion_throw)
-   [Declaración intentar...lanzar](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#declaracion_try...catch)

### Tipos de excepciones

Casi cualquier objeto se puede lanzar en EsJS. Sin embargo, no todos los objetos lanzados son iguales. Si bien es común lanzar números o cadenas como errores, con frecuencia es más efectivo usar uno de los tipos de excepción creados específicamente para este propósito:

- El más común: `Error`.
- [Otros siete tipos de `Error`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Error#tipos_error).

### Expresión `lanzar`

Utiliza la expresión `lanzar` para lanzar una excepción. Una expresión `lanzar` especifica el valor que se lanzará:

```esjs
lanzar expresion;
```

Puedes lanzar cualquier expresión, no solo expresiones de un tipo específico. El siguiente código arroja varias excepciones de distintos tipos:

```esjs
lanzar "Error2"; // tipo Cadena
lanzar 42; // tipo Numero
lanzar verdadero; // tipo Booleano
lanzar { // tipo Objeto
  aCadena: funcion () {
    retornar "¡Soy un objeto!";
  },
};
lanzar Error('Error interno: código 1234'); // tipo Error
```

> **Nota:** Puedes especificar un objeto cuando lanzas una excepción. A continuación, puedes hacer referencia a las propiedades del objeto en el bloque `capturar`.
> 
> <InlinePlayground>
>
> ```esjs
> // Crea un objeto tipo de ExcepcionUsuario
> funcion ExcepcionUsuario(mensaje) {
>   ambiente.mensaje = mensaje;
>   ambiente.nombre = "ExcepcionUsuario";
> }
> 
> // Hacer que la excepción se convierta en una bonita cadena cuando se usa como cadena
> // (por ejemplo, por la consola de errores)
> ExcepcionUsuario.prototype.aCadena = funcion () {
>   retornar ambiente.nombre + ': ' + ambiente.mensaje;
> };
> 
> // Crea una instancia del tipo ExcepcionUsuario y lanza la excepción
> lanzar crear ExcepcionUsuario("Valor muy alto");
> ```
> 
> </InlinePlayground>

### Declaración `intentar...lanzar`

La declaración `intentar...lanzar` marca un bloque de expresiones para probar y especifica una o más respuestas en caso de que se produzca una excepción. Si se lanza una excepción, la declaración `intentar...lanzar` la detecta.

La declaración `intentar...lanzar` consta de un bloque `intentar`, que contiene una o más declaraciones, y un bloque `capturar`, que contiene declaraciones que especifican qué hacer si se lanza una excepción en el bloque `intentar`.

En otras palabras, deseas que el bloque `intentar` tenga éxito, pero si no es así, deseas que el control pase al bloque `capturar`. Si alguna instrucción dentro del bloque `intentar` (o en una función llamada desde dentro del bloque `intentar`) arroja una excepción, el control _inmediatamente_ cambia al bloque `capturar`. Si no se lanza ninguna excepción en el bloque `intentar`, se omite el bloque `capturar`. El bloque `finalmente` se ejecuta después de que se ejecutan los bloques `intentar` y `capturar`, pero antes de las declaraciones que siguen a la declaración `intentar...lanzar`.

#### Ejemplo

El siguiente ejemplo usa una instrucción `intentar...lanzar`. El ejemplo llama a una función que recupera el nombre de un mes de un arreglo en función del valor pasado a la función. Si el valor no corresponde a un número de mes (`1`\-`12`), se lanza una excepción con el valor "`MesInvalido`" y pasan a ejecutarse las declaraciones del bloque `capturar`. Puedes modificar el valor de la constante `miMes` con un número inválido para experimentar este comportamiento.

<InlinePlayground only-playground>

```esjs

var mesNombre;
const mesNumero = 3;

funcion obtenerNombreMes(mes) {
  mes = mes - 1; // Ajusta el número de mes para el índice del arreglo (1 = Enero, 12 = Diciembre)
  let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  si (meses[mes]) {
    retornar meses[mes];
  } sino {
    lanzar Error("MesInvalido"); // aquí se usa la palabra clave lanzar
  }
}

intentar {
  // declaraciones para intentar
  mesNombre = obtenerNombreMes(mesNumero); // la función podría lanzar una excepción
  consola.escribir('El mes N° ' + mesNumero + ' corresponde a: ' + mesNombre);
} capturar (e) {
  mesNombre = "desconocido";
  consola.error(e); // loguear el mensaje de error
}
```

</InlinePlayground>

#### El bloque `capturar`

Puedes usar un bloque `capturar` para manejar todas las excepciones que se puedan generar en el bloque `intentar`.

```esjs
capturar (capturarID) {
  instrucciones
}
```

El bloque `capturar` especifica un identificador (`capturarID` en la sintaxis anterior) que contiene el valor especificado por la expresión `lanzar`. Puedes usar este identificador para obtener información sobre la excepción que se lanzó.

EsJS crea este identificador cuando se ingresa al bloque `capturar`. El identificador dura solo la duración del bloque `capturar`. Una vez que el bloque `capturar` termina de ejecutarse, el identificador ya no existe.

Por ejemplo, el siguiente código lanza una excepción. Cuando ocurre la excepción, el control se transfiere al bloque `capturar`.

```esjs
intentar {
  lanzar "miExcepcion"; // genera una excepción
} capturar (error) {
  // declaraciones para manejar cualquier excepción
  loguearMisErrores(error); // pasa el objeto exception al controlador de errorores
}
```

> **Nota:** **Mejores prácticas:** Cuando se registran errores en la consola dentro de un bloque `capturar`, es conveniente utilizar `consola.error()` en lugar de `consola.escribir()`. Esto formatea el mensaje como un error y lo agrega a la lista de mensajes de error generados por la página.

#### El bloque `finalmente`

El bloque `finalmente` contiene instrucciones que se ejecutarán _después_ que se ejecuten los bloques `intentar` y `capturar`. Además, el bloque `finalmente` ejecuta _antes_ el código que sigue a la declaración `intentar...capturar...finalmente`.

También es importante notar que el bloque `finalmente` se ejecutará _independientemente de que_ se produzca una excepción. Sin embargo, si se lanza una excepción, las declaraciones en el bloque `finalmente` se ejecutan incluso si ningún bloque `capturar` maneje la excepción que se lanzó.

Puedes usar el bloque `finalmente` para hacer que tu script falle correctamente cuando ocurra una excepción. Por ejemplo, es posible que debas liberar un recurso que tu script haya inmovilizado.

El siguiente ejemplo abre un archivo y luego ejecuta declaraciones que usan el archivo. (EsJS de lado del servidor te permite acceder a los archivos). Si se lanza una excepción mientras el archivo está abierto, el bloque `finalmente` cierra el archivo antes de que falle el script. Usar `finalmente` aquí _asegura_ que el archivo nunca se deje abierto, incluso si ocurre un error.

```esjs
abrirMiArchivo();
intentar {
  escribirMiArchivo(datos); // Esto puede arrojar un error
} capturar (e) {
  controlarError(e); // Si ocurrió un error, manéjalo
} finalmente {
  cerrarMiArchivo(); // Siempre cierra el recurso
}
```

Si el bloque `finalmente` devuelve un valor, este valor se convierte en el valor de retorno de toda la producción de `intentar...capturar...finalmente`, independientemente de las declaraciones `retornar` en los bloques `intentar` y `capturar`:

<InlinePlayground>

```esjs
funcion f() {
  intentar {
    consola.escribir(0);
    lanzar "bogus";
  } capturar (e) {
    consola.escribir(1);
    retornar verdadero; // esta declaración de retorno está suspendida
    // hasta que el bloque finalmente se haya completado
    consola.escribir(2); // no alcanzable
  } finalmente {
    consola.escribir(3);
    retornar falso; // sobrescribe el "retornar" anterior
    consola.escribir(4); // no alcanzable
  }
  // "retornar falso" se ejecuta ahora
  consola.escribir(5); // inalcanzable
}
consola.escribir(f()); // 0, 1, 3, falso
```

</InlinePlayground>

La sobrescritura de los valores devueltos por el bloque `finalmente` también se aplica a las excepciones lanzadas o relanzadas dentro del bloque `capturar`:

<InlinePlayground>

```esjs
funcion f() {
  intentar {
    lanzar "bogus";
  } capturar (e) {
    consola.escribir('captura "falso" interno');
    lanzar e; // esta instrucción lanzar se suspende hasta
    // que el bloque finalmente se haya completado
  } finalmente {
    retornar falso; // sobrescribe el "throw" anterior
  }
  // "retornar falso" se ejecuta ahora
}

intentar {
  consola.escribir(f());
} capturar (e) {
  // ¡esto nunca se alcanza!
  // mientras se ejecuta f(), el bloque `finalmente` devuelve falso,
  // que sobrescribe el `lanzar` dentro del `capturar` anterior
  consola.escribir('"falso" externo capturado');
}

// Produce:
// captura "falso" interno
// falso
```

</InlinePlayground>

#### Declaraciones `intentar...lanzar` anidadas

Puedes anidar una o más declaraciones `intentar...lanzar`.

Si un bloque `intentar` interno _no_ tiene un bloque `capturar` correspondiente:

1.  _debe_ contener un bloque `finalmente`, y
2.  el bloque `capturar` adjunto de la declaración `intentar...lanzar` se comprueba para una coincidencia.

Para obtener más información, consulta `bloques try anidados` en la una página de referencia `intentar...lanzar`.

### Utilizar objetos `Error`

Dependiendo del tipo de error, es posible que puedas utilizar las propiedades `nombre` y `mensaje` para obtener un mensaje más refinado.

La propiedad `nombre` proporciona la clase general de `Error` (tal como `DOMException` o `Error`), mientras que `mensaje` generalmente proporciona un mensaje más conciso que el que se obtendría al convertir el objeto error en una cadena.

Si estás lanzando tus propias excepciones, para aprovechar estas propiedades (por ejemplo, si tu bloque `capturar` no discrimina entre tus propias excepciones y las del sistema), puedes usar el constructor `Error`.

Por ejemplo:

<InlinePlayground>

```esjs
funcion hacerAlgoPropensoAErrores() {
  si (verdadero) {
    lanzar crear Error('El mensaje');
  } sino {
    // ...
  }
}

intentar {
  hacerAlgoPropensoAErrores();
} capturar (e) {
  consola.error(e); // Muestra 'El mensaje'
}

```

</InlinePlayground>
