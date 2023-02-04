# EmbedPlayground

Componente que embebe un `iframe`.

## Examples

### Basic Usage

<!--@include: ./demo/EmbedPlayground/Basic.md-->

Source:

<<< @/components/demo/EmbedPlayground/Basic.md

### Show open button

<!--@include: ./demo/EmbedPlayground/ShowOpenButton.md-->

Source:

<<< @/components/demo/EmbedPlayground/ShowOpenButton.md

## Reference

### Properties

| Name           | Type    | Default                     | Description                                                |
|----------------|---------|-----------------------------|------------------------------------------------------------|
| src            | string  | `'https://editor.esjs.dev'` | URL a mostrar                                              |
| height         | string  | `'30em'`                    | Alto del `iframe`                                          |
| showOpenButton | Boolean | `false`                     | Muestra el botón para abrir el Editor en una nueva pestaña |
