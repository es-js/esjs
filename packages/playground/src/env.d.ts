interface ImportMetaEnv {
  readonly VITE_GTAG_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'onigasm/lib/onigasm.wasm?url'
declare module '@es-js/language-tools/esjs.tmLanguage.json'
declare module 'vue-split-view'
declare module 'lz-string'
