import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ncp from 'ncp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const currentPath = process.cwd()

const copyTemplateFiles = (framework, language, projectName, cb) => {
  const sourcePath = path.resolve(__dirname, `../template/${framework}-${language}`)
  const targetPath = path.join(currentPath, projectName)

  ncp(sourcePath, targetPath, err => {
    if (err) {
      console.error('Error copying files:', err)
    }
    else {
      cb()
    }
  })
}

const createEnv = (answer) => {
  const { 
    projectName, baseURL, userName, password, appId, sameAsDev,
    prodBaseURL, prodUserName, prodPassword, prodAppId 
  } = answer

  const envContent = `KINTONE_BASE_URL=${baseURL || ''}
KINTONE_USERNAME=${userName || ''}
KINTONE_PASSWORD=${password || ''}
APP_ID=${appId || ''}
`
  const prodEnvContent = sameAsDev
    ? envContent
    : `KINTONE_BASE_URL=${prodBaseURL || ''}
KINTONE_USERNAME=${prodUserName || ''}
KINTONE_PASSWORD=${prodPassword || ''}
APP_ID=${prodAppId || ''}
`

  const targetPath = path.join(currentPath, projectName)
  const envPath = path.join(targetPath, '.env')
  const prodEnvPath = path.join(targetPath, '.env.prod')

  fs.writeFileSync(envPath, envContent)
  fs.writeFileSync(prodEnvPath, prodEnvContent)
}

const createGitignore = answer => {
  const { projectName } = answer
  const content = `# Local
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
  const targetPath = path.join(currentPath, projectName)
  const gitignorePath = path.join(targetPath, '/.gitignore')

  fs.writeFileSync(gitignorePath, content)
}

const editJsonFile = data => {
  const { key, value, targetFilePath } = data

  fs.readFile(targetFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read file:', err)
      return
    }

    const jsonObject = JSON.parse(data)
    jsonObject[key] = value
    const updatedJsonString = JSON.stringify(jsonObject, null, 2)
    fs.writeFile(targetFilePath, updatedJsonString, (err) => {
      if (err) {
        console.error('Failed to write file:', err)
        return
      }
    })
  })
}

export const generateTemplate = async answer => {
  const { 
    projectName, framework, language, appId, sameAsDev,
    needInformation, needInformationProd, prodAppId 
  } = answer
  
  copyTemplateFiles(framework, language, projectName, () => {
    const targetPath = path.join(currentPath, projectName)

    editJsonFile({
      key: 'name',
      value: projectName,
      targetFilePath: `${targetPath}/package.json`
    })
    createEnv(answer)
    createGitignore(answer)
    
    if (!needInformation) return
    editJsonFile({
      key: 'app',
      value: appId || '',
      targetFilePath: `${targetPath}/mainfests/dev.json`
    })
    editJsonFile({
      key: 'app',
      value: appId || '',
      targetFilePath: `${targetPath}/mainfests/dev-up.json`
    })
    
    if (!needInformationProd) return
    editJsonFile({
      key: 'app',
      value: sameAsDev ? (appId || '') : (prodAppId || ''),
      targetFilePath: `${targetPath}/mainfests/prod.json`
    })
  })
}