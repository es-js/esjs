# EsEjecutar

Componente que tiene un slot para insertar Código Markdown, y lo ejecuta con `@es-js/sandbox`.

## Examples

### Basic Usage

<!--@include: ./demo/EsEjecutar/Basic.md-->

Source:

<<< @/components/demo/EsEjecutar/Basic.md

### Hide Console

<!--@include: ./demo/EsEjecutar/HideConsole.md-->

Source:

<<< @/components/demo/EsEjecutar/HideConsole.md

### Hide Preview

<!--@include: ./demo/EsEjecutar/HidePreview.md-->

Source:

<<< @/components/demo/EsEjecutar/HidePreview.md

### Theme

<!--@include: ./demo/EsEjecutar/Theme.md-->

### Browser Window

<!--@include: ./demo/EsEjecutar/BrowserWindow.md-->

## Reference

### Properties

| Name           | Type    | Default  | Description                                                |
|----------------|---------|----------|------------------------------------------------------------|
| hidePreview    | Boolean | `true`   | Muestra/oculta la previsualización                         |
| hideConsole    | Boolean | `false`  | Muestra/oculta la consola                                  |
| hideOptions    | Boolean | `true`   | Muestra/oculta las opciones                                |
| height         | string  | `'30em'` | Alto del `iframe`                                          |
| showOpenButton | Boolean | `false`  | Muestra el botón para abrir el Editor en una nueva pestaña |

### Slots

| Name    | Parameters | Description                                                                              |
|---------|------------|------------------------------------------------------------------------------------------|
| default |            | Éste slot debe contener código en Markdown, el cual será ejecutado con `@es-js/sandbox`. |
