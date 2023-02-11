/// <reference types="vite/client" />

import type { RequestHandler } from 'express'
import express from 'express'
import viteDevServer from 'vavite/vite-dev-server'

const app = express()

// This is an optional optimization to load routes lazily so that
// when reloadOn option is set to "static-deps-change",
// changes to the route handlers will not trigger a reload.
// Feel free to remove this and import routes directly.
function lazy(
  importer: () => Promise<{ default: RequestHandler }>,
): RequestHandler {
  return async (req, res, next) => {
    try {
      const routeHandler = (await importer()).default
      routeHandler(req, res, next)
    }
    catch (err) {
      if (err instanceof Error)
        viteDevServer?.ssrFixStacktrace(err)
      next(err)
    }
  }
}

app.get(
  '/esjs/:code',
  lazy(() => import('./routes/esjs')),
)

export default app
