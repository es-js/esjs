import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
    },
  },
})
