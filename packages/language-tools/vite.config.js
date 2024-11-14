import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 5000,
    include: ['test/**/*.test.js']
  }
});
