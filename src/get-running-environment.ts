// Copyright 2021 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as os from 'os'

export interface RunningEnvironment {
  architecture: string
  os: string
}

async function getRunningEnvironment(): Promise<RunningEnvironment> {
  return {
    architecture: os.arch(),
    os: os.platform()
  } as RunningEnvironment
}

export default getRunningEnvironment
