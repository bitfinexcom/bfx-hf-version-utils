#!/usr/bin/env node
const checkStableDependencies = require('./src/check-stable-dependencies')

const [, , command, ...args] = process.argv

switch (command) {
  case 'check-deps':
    return checkStableDependencies(...args)
  default: {
    console.error('ERROR: invalid command')
    process.exit(1)
  }
}