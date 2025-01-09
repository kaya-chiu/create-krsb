import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import ncp from 'ncp'
import { dependenciesMap, packageJson, gitignoreContent } from './config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const currentPath = process.cwd()

// 確保目錄存在
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// 複製模板檔案
const copyTemplateFiles = (framework, language, projectName) => {
  const sourcePath = path.resolve(__dirname, `../template/${framework}-${language}`)
  const targetPath = path.join(currentPath, projectName)

  return new Promise((resolve, reject) => {
    ncp(sourcePath, targetPath, err => {
      if (err) {
        console.error('Error copying files:', err)
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 生成 .env 和 .env.prod
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
  ensureDirectoryExists(targetPath)

  fs.writeFileSync(path.join(targetPath, '.env'), envContent)
  fs.writeFileSync(path.join(targetPath, '.env.prod'), prodEnvContent)
}

// 生成 .gitignore
const createGitignore = (projectName) => {
  const targetPath = path.join(currentPath, projectName)
  ensureDirectoryExists(targetPath)
  fs.writeFileSync(path.join(targetPath, '/.gitignore'), gitignoreContent)
}

// 動態生成 package.json
const getLatestVersion = (pkg) => {
  return new Promise((resolve, reject) => {
    exec(`npm show ${pkg} version`, (error, stdout) => {
      if (error) {
        console.error(`Failed to fetch version for ${pkg}:`, error.message)
        resolve('latest') // 默認返回 'latest'
      } else {
        resolve(stdout.trim())
      }
    })
  })
}

const createPackageJson = async (projectName, framework, language, targetPath) => {
  const key = `${framework}_${language}`
  const dependencies = [...dependenciesMap.basic.dependencies, ...dependenciesMap[key].dependencies]
  const devDependencies = [...dependenciesMap.basic.devDependencies, ...dependenciesMap[key].devDependencies]

  packageJson.name = projectName

  for (const pkg of dependencies) {
    packageJson.dependencies[pkg] = `^${await getLatestVersion(pkg)}`
  }
  for (const pkg of devDependencies) {
    packageJson.devDependencies[pkg] = `^${await getLatestVersion(pkg)}`
  }

  fs.writeFileSync(path.join(targetPath, 'package.json'), JSON.stringify(packageJson, null, 2))
}

// 主生成函式
export const generateTemplate = async (answer) => {
  const { projectName, framework, language } = answer
  
  try {
    await copyTemplateFiles(framework, language, projectName)
    const targetPath = path.join(currentPath, projectName)

    await createPackageJson(projectName, framework, language, targetPath)
    createEnv(answer)
    createGitignore(projectName)

  } catch (err) {
    console.error('Generate template failed:', err)
  }
}
