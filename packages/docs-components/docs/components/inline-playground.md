# InlinePlayground

Componente que tiene un slot para insertar Código Markdown, e inserta dicho código en EsJS Editor, pudiendo configurarlo vía URL.

## Examples

### Basic Usage

<!--@include: ./demo/InlinePlayground/Basic.md-->

Source:

<<< @/components/demo/InlinePlayground/Basic.md

### With Preview

<!--@include: ./demo/InlinePlayground/WithPreview.md-->

Source:

<<< @/components/demo/InlinePlayground/WithPreview.md

### OnlyPlayground

<!--@include: ./demo/InlinePlayground/OnlyPlayground.md-->

Source:

<<< @/components/demo/InlinePlayground/OnlyPlayground.md

## Reference

### Properties

| Name           | Type    | Default      | Description                                                                               |
|----------------|---------|--------------|-------------------------------------------------------------------------------------------|
| onlyPlayground | Boolean | `false`      | Si `onlyPlayground === true`, no se muestra el código de `Shiki`, y se muestra el Editor |
| hidePreview    | Boolean | `true`       | Muestra/oculta la previsualización                                                       |
| hideConsole    | Boolean | `false`      | Muestra/oculta la consola                                                                |
| hideOptions    | Boolean | `true`       | Muestra/oculta las opciones                                                              |
| layout         | string  | `'vertical'` | Distribución vertical/horizontal                                                         |

### Slots

| Name    | Parameters | Description                                                                                                             |
|---------| ---------- |-------------------------------------------------------------------------------------------------------------------------|
| default |            | Éste slot debe contener código en Markdown, el cual será comprimido utilizando `lz-string` para abrirlo en EsJS Editor |
