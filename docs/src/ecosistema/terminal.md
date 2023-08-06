# Terminal

El paquete `@es-js/terminal` provee un componente de línea de comandos que permite interactuar con el Usuario.

## Funciones

El objeto Terminal provee funciones para interactuar con el Usuario.

### escribir

Escribe un mensaje en la terminal.

<InlinePlayground only-playground>

```esjs
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir("Hola mundo desde EsJS")
```

</InlinePlayground>

### leer

Lee un valor ingresado por el Usuario.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir("Ingresa tu nombre:")

const nombre = esperar Terminal.leer()

Terminal.escribir(`Hola ${nombre}`)
```

</InlinePlayground>

### leerCadena

Lee una cadena ingresada por el Usuario.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir("Ingresa tu nombre:")
const nombre = esperar Terminal.leerCadena()

Terminal.escribir("Ingresa tu apellido:")
const apellido = esperar Terminal.leerCadena()

Terminal.escribir(`Hola ${nombre} ${apellido}`)
```

</InlinePlayground>

### leerNumero

Lee un número ingresado por el Usuario.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir("Ingresa tu edad:")
const edad = esperar Terminal.leerNumero()

Terminal.escribir(`Tienes ${edad} años`)
```

</InlinePlayground>

### leerSecreto

Lee un valor ingresado por el Usuario sin mostrarlo en la terminal.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir("Ingresa tu contraseña:")
const contraseña = esperar Terminal.leerSecreto()

Terminal.escribir("Ingresa tu contraseña nuevamente:")
const contraseña2 = esperar Terminal.leerSecreto()

Terminal.escribir(contraseña === contraseña2 ? "Las contraseñas coinciden" : "Las contraseñas no coinciden")
```

</InlinePlayground>

### leerEnter

Lee el ingreso de un Enter por parte del Usuario.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir("Presiona Enter para continuar")
esperar Terminal.leerEnter()
Terminal.escribir("Continuando...")
```

</InlinePlayground>

### limpiar

Limpia la terminal.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir("Hola mundo desde EsJS")
Terminal.escribir("Presiona Enter para limpiar la terminal")
esperar Terminal.leerEnter()
Terminal.limpiar()
```

</InlinePlayground>

### centrar

Centra el texto en la terminal.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(Terminal.centrar("Hola mundo desde EsJS"))
```

</InlinePlayground>

### alinearIzquierda

Alinea el texto a la izquierda en la terminal.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(Terminal.alinearIzquierda("Hola mundo desde EsJS"))
```

</InlinePlayground>

### alinearDerecha

Alinea el texto a la derecha en la terminal.

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { Terminal } desde "@es-js/terminal"

Terminal.escribir(Terminal.alinearDerecha("Hola mundo desde EsJS"))
```

</InlinePlayground>
