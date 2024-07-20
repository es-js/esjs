#!/usr/bin/env node

import { defineCommand } from 'citty'
import { consola } from 'consola'
import { execSync as exec } from 'node:child_process'
import { showUsage } from '../utils/utils.mjs'

export default defineCommand({
  meta: {
    name: 'actualizar',
    description: 'Actualiza el CLI de EsJS.',
  },

  async run() {
    try {
      exec('npm install -g es.js@latest', { stdio: 'inherit' })
    } catch (e) {
      consola.error(e)
    }
  },
})
