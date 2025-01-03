// Copyright 2021-2025 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as core from '@actions/core'
import {RunningEnvironment} from './get-running-environment'

async function validate(runningEnvironment: RunningEnvironment): Promise<void> {
  switch (runningEnvironment.os) {
    case 'Linux':
    case 'Darwin':
      core.info(`Operating System: ${runningEnvironment.os}`)
      break
    default:
      core.setFailed('Unsupported operating system')
      process.exit(1)
  }

  switch (runningEnvironment.architecture) {
    case 'x86_64':
    case 'arm64':
      core.info(`Architecture: ${runningEnvironment.architecture}`)
      break
    default:
      core.setFailed('Unsupported architecture')
      process.exit(1)
  }
}

export default validate
