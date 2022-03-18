const path = require('path')
const { readFileSync } = require('fs')
const semver = require('semver')

const packageFilePath = path.join(process.cwd(), 'package.json')
const { dependencies = {} } = JSON.parse(readFileSync(packageFilePath, 'utf-8'))

const scope = process.argv[2]

if (!scope) {
    console.error('ERROR: argument is missing')
    console.error('Usage: check-stable-deps <scope>')
    process.exit(1)
}

if (!scope.startsWith('@')) {
    console.error('ERROR: scope name must start with "@" symbol')
    console.error('Example: @bitfinex')
    process.exit(1)
}

const unstableDeps = []

for (const [name, version] of Object.entries(dependencies)) {
    if (!name.startsWith(scope)) {
        continue
    }

    const { prerelease } = semver.parse(version)
    if (prerelease.length > 0) {
        unstableDeps.push(name)
    }
}

if (unstableDeps.length > 0) {
    console.error(`ERROR: The following dependencies ${unstableDeps.join(', ')} uses pre-release versions, please update before proceeding.`)
    process.exit(1)
}

console.log('Everything is up-to-date :)')