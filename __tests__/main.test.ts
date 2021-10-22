// Copyright 2021 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import {expect, test} from '@jest/globals'
import getVersion from './../src/get-version'
import validate from './../src/validate'
import {RunningEnvironment} from './../src/get-running-environment'

test('test validate()', async () => {
  const createRunningEnvironment = (os: string, architecture: string) => {
    return {architecture, os} as RunningEnvironment
  }

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

  for (const testCase of testCasesWithExpected) {
    const version = await getVersion(testCase.input)

    console.log(
      `Test Case - Input ${testCase.input} - Expected ${testCase.expected} - Actual ${version}`
    )

    expect(version).toBe(testCase.expected)
  }

  for (const testCase of testCasesWithUnexpected) {
    const version = await getVersion(testCase.input)

    console.log(
      `Test Case - Input ${testCase.input} - Unexpected ${testCase.unexpected} - Actual ${version}`
    )

    expect(version).not.toBe(testCase.unexpected)
  }

  return
})
