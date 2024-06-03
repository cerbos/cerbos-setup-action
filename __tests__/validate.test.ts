// Copyright 2021-2024 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import {test} from '@jest/globals'
import validate from './../src/validate'
import {createRunningEnvironment} from './test-utils.test'

test('test validate()', async () => {
  const testCases = [
    {input: createRunningEnvironment('Linux', 'x86_64')},
    {input: createRunningEnvironment('Linux', 'arm64')},
    {input: createRunningEnvironment('Darwin', 'x86_64')},
    {input: createRunningEnvironment('Darwin', 'arm64')}
  ]

  for (const testCase of testCases) {
    console.log(
      `Test Case - Input ${testCase.input.os} ${testCase.input.architecture}`
    )
    await validate(testCase.input)
  }
})
