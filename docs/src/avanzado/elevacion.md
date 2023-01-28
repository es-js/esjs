# Elevación (hoisting)

En EsJS/JavaScript ocurre un mecanismo conocido como "Elevación" (_hoisting_ en inglés), que implica que, al momento de ejecutarse el programa, ciertas porciones de código se "elevan". Es decir, se mueven hacia arriba.

### Elevación de variables (`hoisting`)

En EsJS/JavaScript puedes hacer referencia a una variable global declarada más tarde, sin obtener una excepción.

<InlinePlayground only-playground>

```esjs
consola.escribir('El valor de a es ' + a); // El valor de a es indefinido
global a;
```

</InlinePlayground>

Este concepto se conoce como **elevación.** Las variables en EsJS son, en cierto sentido, "elevadas" (o "izadas") a la parte superior de la función o declaración. Sin embargo, las variables que se elevan devuelven un valor de `indefinido`. Entonces, incluso si la declaras e inicias después de usarla o hacer referencia a esta variable, todavía devuelve `indefinido`.

<InlinePlayground only-playground>

```esjs
consola.escribir(x === indefinido); // verdadero
global x = 3;
```

</InlinePlayground>

<InlinePlayground only-playground>

```esjs
// devolverá un valor de indefinido
global miVariable = 'mi valor';

(funcion() {
  consola.escribir(miVariable); // indefinido
  global miVariable = 'valor local';
})();
```

</InlinePlayground>

Los ejemplos anteriores se interpretarán de la misma manera que:

```esjs
/**
 * Ejemplo 1
 */
global x;
consola.escribir(x === indefinido); // verdadero
x = 3;

/**
 * Ejemplo 2
 */
global miVariable = 'mi valor';

(funcion() {
  global miVariable;
  consola.escribir(miVariable); // indefinido
  miVariable = 'valor local';
})();
```

Debido a la elevación, todas las declaraciones `global` en una función se deben colocar lo más cerca posible de la parte superior de la función. Esta buena práctica aumenta la claridad del código.

En EsJS, `global` y `const` **se elevan pero no se inician**. Hacer referencia a la variable en el bloque antes de la declaración de la variable da como resultado un [`ReferenceError`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError), porque la variable está en una "zona muerta temporal" desde el inicio del bloque hasta que se procesa la declaración.

```esjs
consola.escribir(x); // ReferenceError
var x = 3;
```

### Elevación de función

En el caso de las funciones, solo se incluyen _declaraciones_ de función, pero _no_ las _expresiones_ de la función.

```esjs
/* Declaración de función */

foo(); // "bar"

funcion foo() {
  consola.escribir('bar');
}


/* Expresión de función */

baz(); // TypeError: baz no es una función

global baz = funcion() {
  consola.escribir('bar2');
};
```
