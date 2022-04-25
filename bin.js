#!/usr/bin/env node
const checkUnstableDependencies = require('./src/check-unstable-dependencies')
const updateByTag = require('./src/update-by-tag')

const [, , command, ...args] = process.argv

switch (command) {
  case 'check-unstable-deps':
    checkUnstableDependencies(...args)
    break
  case 'update-by-tag':
    updateByTag(...args)
    break
  default: {
    console.error('ERROR: invalid command')
    process.exit(1)
  }
}
