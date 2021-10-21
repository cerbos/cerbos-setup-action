// Copyright 2021 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as core from '@actions/core'
import {RunningEnvironment} from './get-running-environment'

async function validate(runningEnvironment: RunningEnvironment): Promise<void> {
  switch (runningEnvironment.os) {
    case 'linux' || 'darwin':
      core.info(`Operating System: ${runningEnvironment.os}`)
      break
    default:
      core.setFailed('Unsupported operating system')
      return
  }

  switch (runningEnvironment.architecture) {
    case 'x64' || 'arm64':
      core.info(`Architecture: ${runningEnvironment.architecture}`)
      break
    default:
      core.setFailed('Unsupported architecture')
      return
  }
}

export default validate
