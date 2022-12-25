# @es-js/language-tools

Genera los archivos de sintaxis y configuración de los lenguajes EsJS y EsVue.

- esjs.tmLanguage.json: Basado en la [extensión de JavaScript de VSCode](https://github.com/microsoft/vscode/tree/main/extensions/javascript), al cual se le agrega un repositorio `esjs` (con los tokens de EsJS), y luego se hace uso de este repositorio cada vez que se hace uso del repositorio `source.js#comment`.
- esvue.tmLanguage.json: Basado en el [Frontmatter de Astro](https://github.com/withastro/language-tools/blob/main/packages/vscode/syntaxes/astro.tmLanguage.json), la primera parte la interpreta como `source.esjs`; el resto como `source.vue`.
- esjs-language-configuration.json: Basado en la [extensión de JavaScript de VSCode](https://github.com/microsoft/vscode/tree/main/extensions/javascript), al cual se le agrega un único caso de identación para los tokens `caso` y `porDefecto`.
- esvue-language-configuration.json: Simplemente una copia de [Vetur](https://github.com/vuejs/vetur).
