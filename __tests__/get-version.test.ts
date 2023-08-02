// Copyright 2021-2023 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

const fetch = require('node-fetch')
import {expect, test} from '@jest/globals'
import {Octokit} from '@octokit/core'
import getVersion from './../src/get-version'

test('test getVersion()', async () => {
  const testCasesWithExpected = [
    {input: 'v0.8.0', expected: '0.8.0'},
    {input: '0.8.0', expected: '0.8.0'},
    {input: 'v1', expected: '1'}
  ]

  const testCasesWithUnexpected = [
    {input: 'v0.8.0', unexpected: 'v0.8.0'},
    {input: 'latest', unexpected: undefined}
  ]

  const octokit = new Octokit({
    request: {
      fetch
    }
  })
  for (const testCase of testCasesWithExpected) {
    const version = await getVersion(octokit, testCase.input)

    console.log(
      `Test Case - Input ${testCase.input} - Expected ${testCase.expected} - Actual ${version}`
    )

    expect(version).toBe(testCase.expected)
  }

  for (const testCase of testCasesWithUnexpected) {
    const version = await getVersion(octokit, testCase.input)

    console.log(
      `Test Case - Input ${testCase.input} - Unexpected ${testCase.unexpected} - Actual ${version}`
    )

    expect(version).not.toBe(testCase.unexpected)
  }

  return
})
