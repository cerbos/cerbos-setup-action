// Copyright 2021-2023 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

const binaryNames = ['cerbos', 'cerbosctl']

async function downloadAndCache(url: string, version: string): Promise<void> {
  let extractedPath = ''
  const cacheDirs = []
  core.info(`Downloading release from ${url}.`)

  try {
    const binaryPath = await tc.downloadTool(url)
    extractedPath = await tc.extractTar(binaryPath)

    core.info(`Successfully extracted binaries to ${extractedPath}`)
  } catch (error) {
    core.setFailed(`Error occured during retrieval of cerbos binary. ${error}`)
    process.exit(1)
  }

  try {
    core.info('Adding cerbos binaries to the cache')

    for (const binary of binaryNames) {
      const cacheDir = await tc.cacheDir(extractedPath, binary, version)

      cacheDirs.push(cacheDir)

      core.info(`Cached the binary ${binary} in ${cacheDir}`)
    }
  } catch (error) {
    core.setFailed(
      `Error occured while adding cerbos binaries to tooling cache. ${error}`
    )
    process.exit(1)
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
    process.exit(1)
  }
}

export default downloadAndCache
