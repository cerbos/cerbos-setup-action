// Copyright 2021 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as core from '@actions/core'
import {Octokit} from '@octokit/core'
import {RunningEnvironment} from './get-running-environment'

async function getURLToDownload(
  runningEnvironment: RunningEnvironment,
  version: string
): Promise<string> {
  const assetName = ` cerbos_${version}_${runningEnvironment.os}_${runningEnvironment.architecture}.tar.gz`
  const octokit = new Octokit()
  const {data: releases} = await octokit.request(
    'GET /repos/{owner}/{repo}/releases',
    {
      owner: 'cerbos',
      repo: 'cerbos'
    }
  )

  for (const release of releases) {
    for (const asset of release.assets) {
      if (asset.name === assetName) {
        return asset.browser_download_url
      }
    }
  }

  core.setFailed(`Couldn't find the release asset with version ${version}`)
  return ''
}

export default getURLToDownload
