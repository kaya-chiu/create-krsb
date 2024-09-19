import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginBasicSsl } from '@rsbuild/plugin-basic-ssl'

export default defineConfig({
  plugins: [pluginReact(), pluginBasicSsl()],
  performance: {
    chunkSplit: {
      strategy: 'all-in-one',
    },
  },
  dev: {
    hmr: false,
    liveReload: false,
  },
  output: {
    injectStyles: true,
    distPath: {
      js: './',
    },
    filename: {
      js: 'app.js',
    },
  },
})
