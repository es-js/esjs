/**
 * URLs del sandbox. Solo cuando `devUrl` está definida (ej. http://localhost:4173) se usan
 * runtime y estilos del servidor de desarrollo; si no, se usa CDN.
 */
export function getSandboxUrls(options: {
  devUrl?: string
  cdnVersion: string
}): {
  sandboxBase: string | null
  sandboxRuntimeUrl: string
  sandboxStylesheets: string[] | undefined
} {
  const base = options.devUrl?.replace(/\/$/, '') ?? null
  const sandboxRuntimeUrl = base
    ? `${base}/src/runtime`
    : `https://cdn.jsdelivr.net/npm/@es-js/sandbox@${options.cdnVersion}/runtime/+esm`
  const sandboxStylesheets = base ? [`${base}/src/style.css`] : undefined
  return {
    sandboxBase: base,
    sandboxRuntimeUrl,
    sandboxStylesheets,
  }
}
