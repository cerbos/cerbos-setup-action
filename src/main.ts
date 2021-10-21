// Copyright 2021 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as core from '@actions/core'
import download from './download'
import getLatestVersionTag from './get-latest-version-tag'
import getRunningEnvironment from './get-running-environment'
import validate from './validate'

async function run(): Promise<void> {
  const inputVersion = core.getInput('version')

  let version = ''
  if (inputVersion === 'latest' || inputVersion === '') {
    core.info(
      'Version is set to latest or not provided. Retrieving the latest version tag from GitHub Releases.'
    )
    version = await getLatestVersionTag()
    core.info(`Retrieved latest version tag: ${version}`)
  } else {
    version = inputVersion
    core.info(`Version tag: ${version}`)
  }

  const runningEnvironment = await getRunningEnvironment()
  await validate(runningEnvironment)
  await download(
    runningEnvironment.architecture,
    runningEnvironment.os,
    version
  )
}

run()
