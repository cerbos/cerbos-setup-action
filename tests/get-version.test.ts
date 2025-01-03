// Copyright 2021-2025 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import {describe, it} from 'node:test'
import assert from 'node:assert'
import {Octokit} from 'octokit'
import getVersion from './../src/get-version'

describe('getVersion function', () => {
  const octokit = new Octokit({
    request: {
      fetch
    }
  })

  it('given v0.33.0, should return 0.33.0', async () => {
    const version = await getVersion(octokit, 'v0.33.0')
    assert.strictEqual(version, '0.33.0')
  })

  it('given 0.33.0, should return 0.33.0', async () => {
    const version = await getVersion(octokit, '0.33.0')
    assert.strictEqual(version, '0.33.0')
  })

  it('given v1, should return 1', async () => {
    const version = await getVersion(octokit, 'v1')
    assert.strictEqual(version, '1')
  })

  it('given latest, should not return unexpected', async () => {
    const version = await getVersion(octokit, 'latest')
    assert.notStrictEqual(version, undefined)
  })
})
