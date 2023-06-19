interface ImportMetaEnv {
  readonly VITE_GTAG_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'lz-string'
