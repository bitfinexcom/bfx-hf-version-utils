const os = require('os')
const ChildProcess = require('child_process')
const { listHfDependencies } = require('./shared')

const owner = 'bitfinexcom'

const npm = (args) => {
  console.log(args)
  ChildProcess.spawnSync('npm', args, {
    stdio: 'inherit',
    shell: os.platform() === 'win32'
  })
}

module.exports = (tag = 'canary') => {
  if (!tag) {
    console.error('')
    process.exit(1)
  }

  const dependencies = listHfDependencies()
  const depsToBeUpdated = []
  const depsToBeInstalled = []

  for (const [name, version] of Object.entries(dependencies)) {
    if (version === tag) {
      depsToBeUpdated.push(name)
    } else {
      depsToBeInstalled.push(name)
    }
  }

  if (depsToBeInstalled.length > 0) {
    const formattedList = depsToBeInstalled.map(name => `${owner}/${name}#${tag}`)
    npm(['install', ...formattedList])
  }

  if (depsToBeUpdated.length > 0) {
    npm(['update', ...depsToBeUpdated])
  }
}