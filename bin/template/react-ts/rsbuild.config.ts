import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { cert } from 'kintone-dev-tools'

const tls = cert.certificateFor(['localhost'])

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    https: {
      key: tls.private,
      cert: tls.cert
    },
  },
  performance: {
    chunkSplit: {
      strategy: "all-in-one",
    },
  },
  dev: {
    hmr: false,
    liveReload: false,
  },
  output: {
    distPath: {
      js: './',
    },
    filename: {
      js: 'app.js'
    }
  }
})

