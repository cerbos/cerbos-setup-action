// Copyright 2021 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as core from '@actions/core'
import downloadAndCache from './download-and-cache'
import getRunningEnvironment from './get-running-environment'
import getURLToDownload from './get-url-to-download'
import getVersion from './get-version'
import validate from './validate'

async function run(): Promise<void> {
  const inputVersion = core.getInput('version')
  const runningEnvironment = await getRunningEnvironment()
  await validate(runningEnvironment)

  const version = await getVersion(inputVersion)

  const url = await getURLToDownload(runningEnvironment, version)

  await downloadAndCache(url, version)
}

run()
