// Copyright 2021-2025 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as os from 'os'

export interface RunningEnvironment {
  architecture: string
  os: string
}

async function getRunningEnvironment(): Promise<RunningEnvironment> {
  let architecture = os.arch()
  let platform = os.platform().toString()

  switch (architecture) {
    case 'x64':
      architecture = 'x86_64'
      break
    case 'arm64':
      architecture = 'arm64'
      break
  }

  switch (platform) {
    case 'linux':
      platform = 'Linux'
      break
    case 'darwin':
      platform = 'Darwin'
      break
    case 'win32':
      platform = 'Windows'
      break
  }

  return {
    architecture,
    os: platform
  } as RunningEnvironment
}

export default getRunningEnvironment
