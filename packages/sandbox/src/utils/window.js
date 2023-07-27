import 'iconify-icon'
import { evalFiles, hidePreview, previewTab, setupTheme } from './ejecutar.ts'

export function setupWindow() {
  return new Promise((resolve) => {
    window.process = { env: {} }
    window.__modules__ = {}

    window.__export__ = (mod, key, get) => {
      Object.defineProperty(mod, key, {
        enumerable: true,
        configurable: true,
        get,
      })
    }

    window.__dynamic_import__ = (key) => {
      return Promise.resolve(window.__modules__[key])
    }

    window._handleInfiniteLoopException = function (error) {
      console.warn('¡Advertencia!: Se ha detectado un bucle infinito')
      console.error(error)
    }

    window._previewException = function (line, column, message) {
      console.warn(`¡Advertencia!: Se ha detectado un error en la línea ${line}`)
    }

    window.onerror = function (
      msg,
      url,
      lineNo,
      columnNo,
      error,
    ) {
      // ignore errors from import map polyfill - these are necessary for
      // it to detect browser support
      if (msg.includes('module specifier “vue”')) {
        // firefox only error, ignore
        return false
      }
      if (msg.includes('Module specifier, \'vue')) {
        // Safari only
        return false
      }
      try {
        parent.postMessage({ action: 'error', value: error }, '*')
      }
      catch (e) {
        parent.postMessage({ action: 'error', value: msg }, '*')
      }
    }

    window.addEventListener('message', handle_message, false)

    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason.message.includes('Cross-origin')) {
        event.preventDefault()
        return
      }
      try {
        parent.postMessage({ action: 'unhandledrejection', value: event.reason }, '*')
      }
      catch (e) {
        parent.postMessage({ action: 'unhandledrejection', value: event.reason.message }, '*')
      }
    })

    registerEsJSPruebaEvents()

    window.addEventListener('load', () => {
      resolve()
    })
  })
}

function registerEsJSPruebaEvents() {
  const events = [
    'esjs-prueba-success',
    'esjs-prueba-error',
    'esjs-pruebas-finished',
  ]

  events.map((event) => {
    window.addEventListener(event, (args) => {
      parent.postMessage({ action: event, data: JSON.stringify(args.detail) }, '*')
    })
  })
}

async function handle_message(ev) {
  const { action, cmd_id, args } = ev.data

  const send_message = payload => parent.postMessage({ ...payload }, ev.origin)
  const send_reply = payload => send_message({ ...payload, cmd_id })
  const send_ok = () => send_reply({ action: 'cmd_ok' })
  const send_error = (message, stack) => send_reply({ action: 'cmd_error', message, stack })

  if (action === 'eval') {
    try {
      await evalFiles(args)

      send_ok()
    }
    catch (error) {
      send_error(error.message, error.stack)
    }
  }
  else if (action === 'HIDE_PREVIEW') {
    hidePreview(args)
  }
  else if (action === 'previewException') {
    window._previewException(...args)
  }
  else if (action === 'PREVIEW') {
    // console.warn(['----- DEPRECATED -----', 'Please use PREVIEW_TAB instead'])
  }
  else if (action === 'PREVIEW_TAB') {
    previewTab(args)
  }
  else if (action === 'DARK_MODE') {
    setupTheme(args === true ? 'dark' : 'light')
  }
}

