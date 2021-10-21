import * as core from '@actions/core'
import * as os from 'os'
import * as tc from '@actions/tool-cache'

const binaryNames = ['cerbos', 'cerbosctl']

async function download(): Promise<void> {
  const version = core.getInput('version')
  const cerbosBinaryUrl = `https://github.com/cerbos/cerbos/releases/download/v${version}/cerbos_${version}_Linux_x86_64.tar.gz`
  let extractedPath = ''
  const cacheDirs: string[] = []

  core.info(
    `Downloading release with version ${version} from ${cerbosBinaryUrl}.`
  )

  try {
    const binaryPath = await tc.downloadTool(cerbosBinaryUrl)
    extractedPath = await tc.extractTar(binaryPath)

    core.info(`Successfully extracted binaries to ${extractedPath}`)
  } catch (error) {
    core.setFailed(`Error occured during retrieval of cerbos binary. ${error}`)
  }

  try {
    core.info('Adding cerbos binaries to the cache')

    for (const binary of binaryNames) {
      const cacheDir = await tc.cacheDir(
        extractedPath,
        binary,
        version,
        os.arch()
      )

      cacheDirs.push(cacheDir)

      core.info(`Cached the binary ${binary} in ${cacheDir}`)
    }
  } catch (error) {
    core.setFailed(
      `Error occured while adding cerbos binaries to tooling cache. ${error}`
    )
  }

  try {
    core.info('Adding cerbos binaries to path')

    for (const cacheDir of cacheDirs) {
      core.addPath(cacheDir)

      core.info(`Added the binary to path (${cacheDir})`)
    }
  } catch (error) {
    core.setFailed(
      `Error occured while adding cerbos binaries to path. ${error}`
    )
  }
}

export default download
