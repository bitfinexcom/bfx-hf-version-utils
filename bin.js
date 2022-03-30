#!/usr/bin/env node
const checkUnstableDependencies = require('./src/check-unstable-dependencies')
const updateByTag = require('./src/update-by-tag')

const [, , command, ...args] = process.argv

switch (command) {
  case 'check-unstable-deps':
    return checkUnstableDependencies(...args)
  case 'update-by-tag':
    return updateByTag(...args)
  default: {
    console.error('ERROR: invalid command')
    process.exit(1)
  }
}