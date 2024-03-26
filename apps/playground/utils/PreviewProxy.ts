// ReplProxy and srcdoc implementation from Svelte REPL
// MIT License https://github.com/sveltejs/svelte-repl/blob/master/LICENSE

let uid = 1

export class PreviewProxy {
  iframe: HTMLIFrameElement
  handlers: Record<string, Function>
  pending_cmds: Map<
    number,
    { resolve: (value: unknown) => void; reject: (reason?: any) => void }
  >

  handle_event: (e: any) => void

  constructor(iframe: HTMLIFrameElement, handlers: Record<string, Function>) {
    this.iframe = iframe
    this.handlers = handlers

    this.pending_cmds = new Map()

    this.handle_event = e => this.handle_repl_message(e)
    window.addEventListener('message', this.handle_event, false)
  }

  destroy() {
    window.removeEventListener('message', this.handle_event)
  }

  iframe_command(action: string, args: any) {
    return new Promise((resolve, reject) => {
      const cmd_id = uid++

      this.pending_cmds.set(cmd_id, { resolve, reject })

      this.iframe.contentWindow!.postMessage({ action, cmd_id, args }, '*')
    })
  }

  handle_command_message(cmd_data: any) {
    const action = cmd_data.action
    const id = cmd_data.cmd_id
    const handler = this.pending_cmds.get(id)

    if (handler) {
      this.pending_cmds.delete(id)
      if (action === 'cmd_error') {
        const { message, stack } = cmd_data
        const e = new Error(message)
        e.stack = stack
        handler.reject(e)
      }

      if (action === 'cmd_ok') {
        handler.resolve(cmd_data.args)
      }
    } else if (action !== 'cmd_error' && action !== 'cmd_ok') {
      console.error('command not found', id, cmd_data, [
        ...this.pending_cmds.keys(),
      ])
    }
  }

  handle_repl_message(event: any) {
    if (event.source !== this.iframe.contentWindow) { return }

    const { action, args } = event.data

    switch (action) {
      case 'cmd_error':
      case 'cmd_ok':
        return this.handle_command_message(event.data)
      // case 'fetch_progress':
      //   return this.handlers.on_fetch_progress(args.remaining)
      case 'error':
        return this.handlers.on_error(event.data)
      case 'unhandledrejection':
        return this.handlers.on_unhandled_rejection(event.data)
      case 'esjs-prueba-success':
        return this.handlers.on_prueba_success(event.data)
      case 'esjs-prueba-error':
        return this.handlers.on_prueba_error(event.data)
      case 'esjs-pruebas-finished':
        return this.handlers.on_pruebas_finished(event.data)
      case 'activePreview':
        return this.handlers.on_active_preview(event.data)
      case 'activePreviewTab':
        return this.handlers.on_active_preview_tab(event.data)
    }
  }

  eval(files: Record<string, string>, options: any) {
    return this.iframe_command('eval', { files, options })
  }
}
