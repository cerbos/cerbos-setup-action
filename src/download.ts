// Copyright 2021 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

const binaryNames = ['cerbos', 'cerbosctl']

async function download(
  architecture: string,
  os: string,
  version: string
): Promise<void> {
  let urlArchitecture = ''
  let urlOs = ''

  if (architecture === 'x64') {
    urlArchitecture = 'x86_64'
  } else {
    urlArchitecture = architecture
  }

  urlOs = os.charAt(0).toUpperCase() + os.slice(1)

  const cerbosBinaryUrl = `https://github.com/cerbos/cerbos/releases/download/v${version}/cerbos_${version}_${urlOs}_${urlArchitecture}.tar.gz`

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
      const cacheDir = await tc.cacheDir(extractedPath, binary, version, os)

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
