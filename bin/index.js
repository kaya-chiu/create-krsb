#!/usr/bin/env node

import { askQuestions } from './prompts/index.js'
import { showLoading } from './utils/showLoading.js'
import { generateTemplate } from './utils/generator.js'
import { logResult } from './utils/logResult.js'

async function main() {
  try {
    // ask questions & get answers
    const answer = await askQuestions()

    // show loading
    const stopLoading = showLoading('Creating project...')

    // generate template
    await generateTemplate(answer)

    // show log
    stopLoading()
    logResult(answer)

  } catch (err) {
    console.error('Create failed: ', err)
  }
}

main()