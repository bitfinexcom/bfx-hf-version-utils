const semver = require('semver')
const { listHfDependencies } = require('./shared')

const isPreRelease = (version) => {
  if (!semver.valid(version)) {
    return false
  }
  const { prerelease } = semver.parse(version)
  return prerelease.length > 0
}

module.exports = () => {
  const dependencies = listHfDependencies()
  const unstableDeps = []

  for (const [name, version] of Object.entries(dependencies)) {
    if (version === 'canary' || isPreRelease(version)) {
      unstableDeps.push(name)
    }
  }

  if (unstableDeps.length > 0) {
    console.error(`ERROR: The following dependencies ${unstableDeps.join(', ')} uses unstable versions, please update before proceeding.`)
    process.exit(1)
  }

  console.log('Everything is up-to-date :)')
}