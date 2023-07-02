interface ImportMetaEnv {
  readonly VITE_GTAG_ID: string
  readonly MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'lz-string'
