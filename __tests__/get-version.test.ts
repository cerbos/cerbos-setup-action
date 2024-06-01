// Copyright 2021-2024 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import {expect, test} from '@jest/globals'
import {Octokit} from 'octokit'
import getVersion from './../src/get-version'

test('test getVersion()', async () => {
  const testCasesWithExpected = [
    {input: 'v0.33.0', expected: '0.33.0'},
    {input: '0.33.0', expected: '0.33.0'},
    {input: 'v1', expected: '1'}
  ]

  const testCasesWithUnexpected = [
    {input: 'v0.33.0', unexpected: 'v0.33.0'},
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
