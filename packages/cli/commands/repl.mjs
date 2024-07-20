#!/usr/bin/env node

import { compile } from '@es-js/core'
import { defineCommand } from 'citty'
import repl from 'node:repl'

export default defineCommand({
  meta: {
    name: 'repl',
    description: 'REPL para el lenguaje de programación EsJS.',
  },

  async run({ args }) {
    const replServer = repl.start({
      prompt: '> ',
      eval: (cmd, context, filename, callback) => {
        let error
        let result
        try {
          const js = compile(cmd, {
            compiler: 'essucrase',
          })

          // biome-ignore lint/security/noGlobalEval: This is a CLI tool.
          result = eval(js)
        } catch (exception) {
          error = exception?.message ? exception.message : exception
        }

        callback(error, result)
      },
      ignoreUndefined: true,
    })

    // Setup history.
    const NODE_REPL_HISTORY = process.env.NODE_REPL_HISTORY
    replServer.setupHistory(NODE_REPL_HISTORY, () => {})
  },
})
