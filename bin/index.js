#!/usr/bin/env node

import { askQuestions } from './prompts/index.js'
import { generateTemplate } from './utils/generator.js'
import { logResult } from './utils/logResult.js'

async function main() {
  try {
    // ask questions & get answers
    const answer = await askQuestions()

    // generate template
    await generateTemplate(answer)

    // show log
    logResult(answer)

  } catch (err) {
    console.error('Create failed: ', err)
  }
}

main()