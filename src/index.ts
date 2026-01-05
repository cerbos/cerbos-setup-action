// Copyright 2021-2026 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as core from '@actions/core'
import * as common from 'cerbos-actions-common'
import {HttpsProxyAgent} from 'https-proxy-agent'
import {Octokit} from 'octokit'

async function run(): Promise<void> {
  const githubToken = core.getInput('github_token')
  if (githubToken === '') {
    core.warning(
      `The action input 'github_token' is unavailable. Stricter rate limiting will be applied by GitHub.`
    )
  }

  const version = core.getInput('version')

  const octokit = new Octokit({
    auth: githubToken,
    request: {
      agent: process.env.http_proxy
        ? new HttpsProxyAgent(process.env.http_proxy)
        : undefined,
      fetch
    },
    userAgent: process.env['GITHUB_REPOSITORY']
      ? process.env['GITHUB_REPOSITORY']
      : 'cerbos-setup-action'
  })

  await common.setup({
    binaries: ['cerbos', 'cerbosctl'],
    octokit: octokit,
    version: version
  })
}

run()
