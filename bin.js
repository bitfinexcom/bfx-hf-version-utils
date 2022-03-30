#!/usr/bin/env node
const checkUnstableDependencies = require('./src/check-unstable-dependencies')

const [, , command, ...args] = process.argv

switch (command) {
  case 'check-unstable-deps':
    return checkUnstableDependencies(...args)
  default: {
    console.error('ERROR: invalid command')
    process.exit(1)
  }
}