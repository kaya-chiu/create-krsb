export const dependenciesMap = {
  basic: {
    dependencies: [],
    devDependencies: [
      '@rsbuild/core',
      '@rsbuild/plugin-basic-ssl',
      '@kintone/customize-uploader',
      'kintone-uploader-env'
    ]
  },
  react_js: {
    dependencies: ['react', 'react-dom'],
    devDependencies: ['@rsbuild/plugin-react']
  },
  react_ts: {
    dependencies: ['react', 'react-dom'],
    devDependencies: [
      '@kintone/dts-gen',
      '@rsbuild/plugin-react',
      '@types/react',
      '@types/react-dom',
      'typescript'
    ]
  },
  vue_js: {
    dependencies: ['vue'],
    devDependencies: ['@rsbuild/plugin-vue']
  },
  vue_ts: {
    dependencies: ['vue'],
    devDependencies: ['@kintone/dts-gen', '@rsbuild/plugin-vue', 'typescript']
  },
  vanilla_js: {
    dependencies: [],
    devDependencies: []
  },
  vanilla_ts: {
    dependencies: [],
    devDependencies: ['@kintone/dts-gen', 'typescript']
  }
}

export const packageJson = {
  name: '',
  version: '1.0.0',
  description: '',
  main: 'index.js',
  scripts: {
    'build': 'rsbuild build',
    'dev': 'kintone-uploader-env && rsbuild dev',
    'update:dev': 'rsbuild build && kintone-uploader-env -m mainfests/prod.json',
    'update:prod': 'rsbuild build --env-mode prod && kintone-uploader-env -e .env.prod -m mainfests/prod.json'
  },
  dependencies: {},
  devDependencies: {}
}

export const gitignoreContent = `# Local
.DS_Store
*.local
*.log*
.env
.env.*

# Dist
node_modules
dist/

# IDE
.vscode/*
!.vscode/extensions.json
.idea
`