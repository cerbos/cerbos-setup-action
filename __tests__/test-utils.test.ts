// Copyright 2021-2024 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import {test} from '@jest/globals'
import {RunningEnvironment} from '../src/get-running-environment'

export const createRunningEnvironment = (os: string, architecture: string) => {
  return {architecture, os} as RunningEnvironment
}

test('testUtils', async () => {
  return
})
