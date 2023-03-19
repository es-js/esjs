# Módulos

Un módulo es un espacio de nombres que contiene variables, constantes, funciones y clases. Cada archivo puede ser considerado como un módulo. Los módulos pueden ser importados y exportados.

## Importar

En EsJS es posible importar variables, constantes, funciones y clases utilizando la palabra clave `importar`:

```esjs
importar { x } desde './archivo.esjs';
```

### Ejemplo

<InlinePlayground hide-console hide-preview="false">

```esjs
importar { Terminal } desde '@es-js/terminal'

Terminal.escribir('Hola mundo!')
```

</InlinePlayground>

## Exportar

En EsJS es posible exportar variables, constantes y funciones utilizando la palabra clave `exportar`:

```esjs
exportar var x = 1;

exportar const x = 2;

exportar funcion miFuncion() {
    // código
}
```

### Ejemplo

```esjs
exportar var x = 1;

exportar const y = 2;

exportar funcion miFuncion() {
    consola.escribir('Hola mundo');
}
```
