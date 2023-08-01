interface ImportMetaEnv {
  readonly VITE_GTAG_ID: string
  readonly MODE: string
  readonly VITE_SANDBOX_DEV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'lz-string'
