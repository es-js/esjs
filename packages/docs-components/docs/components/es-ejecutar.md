# EsEjecutar

Componente que tiene un slot para insertar Código Markdown, y lo ejecuta en ejecutar.esjs.dev

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

## Reference

### Properties

| Name           | Type    | Default      | Description                                                                               |
|----------------|---------|--------------|-------------------------------------------------------------------------------------------|
| hidePreview    | Boolean | `true`       | Muestra/oculta la previsualización                                                       |
| hideConsole    | Boolean | `false`      | Muestra/oculta la consola                                                                |

### Slots

| Name    | Parameters | Description                                                                                                             |
|---------| ---------- |-------------------------------------------------------------------------------------------------------------------------|
| default |            | Éste slot debe contener código en Markdown, el cual será comprimido utilizando `lz-string` para abrirlo en EsJS Editor |
