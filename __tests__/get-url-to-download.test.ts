// Copyright 2021-2023 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import {expect, test} from '@jest/globals'
import {Octokit} from '@octokit/core'
import getURLToDownload from './../src/get-url-to-download'
import {createRunningEnvironment} from './test-utils.test'

test('test getURLToDownload()', async () => {
  const testCases = [
    {
      inputRunningEnvironment: createRunningEnvironment('Linux', 'x86_64'),
      inputVersion: '0.8.0',
      expected:
        'https://github.com/cerbos/cerbos/releases/download/v0.8.0/cerbos_0.8.0_Linux_x86_64.tar.gz'
    },
    {
      inputRunningEnvironment: createRunningEnvironment('Linux', 'arm64'),
      inputVersion: '0.8.0',
      expected:
        'https://github.com/cerbos/cerbos/releases/download/v0.8.0/cerbos_0.8.0_Linux_arm64.tar.gz'
    },
    {
      inputRunningEnvironment: createRunningEnvironment('Darwin', 'x86_64'),
      inputVersion: '0.8.0',
      expected:
        'https://github.com/cerbos/cerbos/releases/download/v0.8.0/cerbos_0.8.0_Darwin_x86_64.tar.gz'
    },
    {
      inputRunningEnvironment: createRunningEnvironment('Darwin', 'arm64'),
      inputVersion: '0.8.0',
      expected:
        'https://github.com/cerbos/cerbos/releases/download/v0.8.0/cerbos_0.8.0_Darwin_arm64.tar.gz'
    }
  ]

  const octokit = new Octokit({})
  for (const testCase of testCases) {
    const url = await getURLToDownload(
      octokit,
      testCase.inputRunningEnvironment,
      testCase.inputVersion
    )

    console.log(
      `Test Case - Input Running Environment ${testCase.inputRunningEnvironment.os} ${testCase.inputRunningEnvironment.architecture} - Input Version ${testCase.inputVersion} - Expected ${testCase.expected} - Actual ${url}`
    )

    expect(url).toBe(testCase.expected)
  }

  return
})
