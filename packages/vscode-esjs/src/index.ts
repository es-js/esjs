import path from 'path'
import type { ExtensionContext } from 'vscode'
import * as vscode from 'vscode'
import {
  arrayMethods,
  consoleMethods,
  keywordControl,
  mathMethods,
  numberMethods,
  stringMethods,
} from '@es-js/core/keywords'
import type {
  LanguageClientOptions,
  ServerOptions,
} from 'vscode-languageclient/node'
import { LanguageClient, TransportKind } from 'vscode-languageclient/node'
import { registerMethods } from './utils/register-methods-completion'

let client: LanguageClient

export async function activate(context: ExtensionContext) {
  const serverModule = context.asAbsolutePath(
    path.join('node_modules', 'vscode-languageserver', 'node.js'),
  )

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: { module: serverModule, transport: TransportKind.ipc },
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'esjs' }],
  }

  client = new LanguageClient(
    'esjs',
    'EsJS Language Server',
    serverOptions,
    clientOptions,
  )

  const keywordsProviders = vscode.languages.registerCompletionItemProvider(
    '*',
    {
      provideCompletionItems() {
        return [
          ...Array.from(keywordControl).map(
            ([esjsKeyword, jsKeyword]) =>
              new vscode.CompletionItem(String(esjsKeyword)),
          ),
        ]
      },
    },
  )

  context.subscriptions.push(
    keywordsProviders,
    registerMethods('consola.', consoleMethods),
    registerMethods('Lista.', arrayMethods),
    registerMethods('Mate.', mathMethods),
    registerMethods('Numero.', numberMethods),
    registerMethods('Cadena.', stringMethods),
  )

  await client.start()
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined
  }

  return client.stop()
}
