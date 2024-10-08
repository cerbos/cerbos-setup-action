// Copyright 2021-2024 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import {describe, it} from 'node:test'
import validate from './../src/validate'
import {createRunningEnvironment} from './test-utils.test'

describe('validate function', () => {
  it('should be successful given input Linux x86_64', async () => {
    const re = createRunningEnvironment('Linux', 'x86_64')
    await validate(re)
  })

  it('should be successful given input Linux arm64', async () => {
    const re = createRunningEnvironment('Linux', 'arm64')
    await validate(re)
  })

  it('should be successful given input Darwin x86_64', async () => {
    const re = createRunningEnvironment('Darwin', 'x86_64')
    await validate(re)
  })

  it('should be successful given input Darwin arm64', async () => {
    const re = createRunningEnvironment('Darwin', 'arm64')
    await validate(re)
  })
})
