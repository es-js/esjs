import vscode from 'vscode'

export function registerMethods(prefix: string, keywords: Map<string, string>) {
  return vscode.languages.registerCompletionItemProvider(
    '*',
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
      ) {
        const linePrefix = document
          .lineAt(position)
          .text.substr(0, position.character)

        if (!linePrefix.endsWith(prefix)) {
          return undefined
        }

        return [
          ...Array.from(keywords).map(
            ([esjsKeyword]) =>
              new vscode.CompletionItem(
                String(esjsKeyword),
                vscode.CompletionItemKind.Method,
              ),
          ),
        ]
      },
    },
    '.',
  )
}
