// Copyright 2021-2024 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import {describe, it} from 'node:test'
import assert from 'node:assert'
import {Octokit} from 'octokit'
import getURLToDownload from '../src/get-url-to-download'
import {createRunningEnvironment} from './test-utils.test'

describe('getURLToDownload function', () => {
  const cerbosVersion = '0.39.0'
  const octokit = new Octokit({
    request: {
      fetch
    }
  })

  it('should return correct download URL for v0.39.0 (Linux x86_64)', async () => {
    const re = createRunningEnvironment('Linux', 'x86_64')
    const url = await getURLToDownload(octokit, re, cerbosVersion)
    assert.strictEqual(
      url,
      'https://github.com/cerbos/cerbos/releases/download/v0.39.0/cerbos_0.39.0_Linux_x86_64.tar.gz'
    )
  })

  it('should return correct download URL for v0.39.0 (Linux arm64)', async () => {
    const re = createRunningEnvironment('Linux', 'arm64')
    const url = await getURLToDownload(octokit, re, cerbosVersion)
    assert.strictEqual(
      url,
      'https://github.com/cerbos/cerbos/releases/download/v0.39.0/cerbos_0.39.0_Linux_arm64.tar.gz'
    )
  })

  it('should return correct download URL for v0.39.0 (Darwin x86_64)', async () => {
    const re = createRunningEnvironment('Darwin', 'x86_64')
    const url = await getURLToDownload(octokit, re, cerbosVersion)
    assert.strictEqual(
      url,
      'https://github.com/cerbos/cerbos/releases/download/v0.39.0/cerbos_0.39.0_Darwin_x86_64.tar.gz'
    )
  })

  it('should return correct download URL for v0.39.0 (Linux arm64)', async () => {
    const re = createRunningEnvironment('Darwin', 'arm64')
    const url = await getURLToDownload(octokit, re, cerbosVersion)
    assert.strictEqual(
      url,
      'https://github.com/cerbos/cerbos/releases/download/v0.39.0/cerbos_0.39.0_Darwin_arm64.tar.gz'
    )
  })
})
