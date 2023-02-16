// Copyright 2021-2023 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as core from '@actions/core'
import downloadAndCache from './download-and-cache'
import getRunningEnvironment from './get-running-environment'
import getURLToDownload from './get-url-to-download'
import getVersion from './get-version'
import validate from './validate'

async function run(): Promise<void> {
  const inputVersion = core.getInput('version')
  const inputGitHubToken = core.getInput('github_token')
  if (inputGitHubToken === '') {
    core.warning(
      'github_token is unavailable. Stricter rate limiting will be applied by GitHub.'
    )
  }

  core.info(`Version from input: ${inputVersion}`)

  const runningEnvironment = await getRunningEnvironment()
  await validate(runningEnvironment)

  const version = await getVersion(inputVersion)

  const url = await getURLToDownload(
    runningEnvironment,
    version,
    inputGitHubToken
  )

  await downloadAndCache(url, version)
}

run()
