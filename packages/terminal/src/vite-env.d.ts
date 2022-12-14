/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-resize'
declare module 'lodash.debounce'
declare module 'is-number'
declare module 'string.ify'
