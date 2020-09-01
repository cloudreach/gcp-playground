/* eslint-disable import/first */

import { readdirSync } from 'fs'
import { resolve } from 'path'

// Folder where all your individual Cloud Functions files are located.
const FUNCTIONS_FOLDER = './functions'

readdirSync(resolve(__dirname, FUNCTIONS_FOLDER)).forEach((file: string) => { // list files in the folder.
  const fileBaseName = file
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === fileBaseName) {
    exports[fileBaseName] = require(`${FUNCTIONS_FOLDER}/${fileBaseName}`).default
  }
})
