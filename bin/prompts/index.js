import chalk from 'chalk'
import inquirer from 'inquirer'

export const askQuestions = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: (value) => {
        if (value.trim() === '') {
          return 'Project name cannot be empty.'
        }
        else {
          return true
        }
      }
    },
    {
      type: 'list',
      name: 'language',
      choices: [
        { name: chalk.yellow('JavaScript'), value: 'js' },
        { name: chalk.blue('TypeScript'), value: 'ts' }
      ],
      message: 'Select language:'
    },
    {
      type: 'list',
      name: 'framework',
      choices: [
        { name: chalk.green('Vue'), value: 'vue' },
        { name: chalk.cyan('React'), value: 'react' },
        { name: chalk.magenta('No framework'), value: 'none' }
      ],
      message: 'Select framework:'
    },
    {
      type: 'confirm',
      name: 'needInformation',
      message: 'Enter kintone info for development environment? \n (Editable later in .env file.)'
    },
    {
      type: 'input',
      name: 'baseURL',
      message: 'Enter base url (ex: https://domain.cybozu.com) :',
      when: (answers) => answers.needInformation === true
    },
    {
      type: 'input',
      name: 'userName',
      message: 'Enter username :',
      when: (answers) => answers.needInformation === true
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter password :',
      when: (answers) => answers.needInformation === true
    },
    {
      type: 'input',
      name: 'appId',
      message: 'Enter application id :',
      when: (answers) => answers.needInformation === true
    },
    {
      type: 'confirm',
      name: 'needInformationProd',
      message: 'Enter kintone info for production environment? \n (Editable later in .env.prod file.)',
      when: (answers) => answers.needInformation === true
    },
    {
      type: 'confirm',
      name: 'sameAsDev',
      message: 'Use the same info for production as development?',
      when: (answers) => answers.needInformationProd && answers.needInformation === true
    },
    {
      type: 'input',
      name: 'prodBaseURL',
      message: 'Enter production base URL (e.g., https://domain.cybozu.com):',
      when: (answers) => answers.needInformationProd && (!answers.needInformation || answers.sameAsDev === false)
    },
    {
      type: 'input',
      name: 'prodUserName',
      message: 'Enter production username:',
      when: (answers) => answers.needInformationProd && (!answers.needInformation || answers.sameAsDev === false)
    },
    {
      type: 'password',
      name: 'prodPassword',
      message: 'Enter production password:',
      when: (answers) => answers.needInformationProd && (!answers.needInformation || answers.sameAsDev === false)
    },
    {
      type: 'input',
      name: 'prodAppId',
      message: 'Enter production application ID:',
      when: (answers) => answers.needInformationProd && (!answers.needInformation || answers.sameAsDev === false)
    },
  ])

  return answer
}