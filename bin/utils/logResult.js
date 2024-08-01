import chalk from 'chalk'

// Function to determine the package manager
const getPackageManager = () => {
  const userAgent = process.env.npm_config_user_agent
  if (userAgent) {
    if (userAgent.includes('pnpm')) {
      return 'pnpm'
    } else if (userAgent.includes('npm')) {
      return 'npm'
    }
  }
  return 'npm' // Default to npm
}

const npm$pnpm = getPackageManager()

const header = `
${chalk.magenta.bold('*** Your new project has been created! ***')}
`

const noInfo = `
${chalk.cyan.bold(`Before you start, please make sure you've filled out
the following files:`)}
${chalk.green('- .env')}
${chalk.green('- .env.prod')}
${chalk.green('- manifests/dev.json')}
${chalk.green('- manifests/prod.json')}
`

const main = `
Watch for changes during development:
${chalk.yellow(`${npm$pnpm} run dev`)}

Update customizations to development environment:
${chalk.yellow(`${npm$pnpm} run update:dev`)}

Update customizations to production environment:
${chalk.yellow(`${npm$pnpm} run update:prod`)}
`

export const logResult = answer => {
  const { needInformation, needInformationProd, projectName } = answer
  
  const init = `
To initialize project:
${chalk.yellow(`cd ${projectName}`)}
${chalk.yellow(`${npm$pnpm} install`)}
`

  if (!needInformation || !needInformationProd) {
    console.log(header + noInfo + init + main)
    return
  } else {
    console.log(header + init + main)
  }
}