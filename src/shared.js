const { join } = require('path')
const { readFileSync } = require('fs')

const namespace = 'bfx-hf'
const gitVersionSeparator = '#'

const readPackage = () => {
  const path = join(process.cwd(), 'package.json')
  const contents = readFileSync(path, 'utf-8')
  return JSON.parse(contents)
}

const hfOnly = ([name]) => {
  return name.startsWith(namespace)
}

const getVersion = ([name, versionRange]) => {
  if (!versionRange.startsWith('git')) {
    return [name, versionRange]
  }

  const idx = versionRange.indexOf(gitVersionSeparator)
  const version = idx >= 0
    ? versionRange.slice(idx + 1)
    : 'master'

  return [name, version]
}

module.exports.listHfDependencies = () => {
  const { dependencies = {} } = readPackage()

  return Object.fromEntries(
    Object.entries(dependencies)
      .filter(entry => hfOnly(entry))
      .map(entry => getVersion(entry))
  )
}
