// Copyright 2021-2025 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0
import * as core from '@actions/core'
async function getURLToDownload(octokit, runningEnvironment, version) {
  const assetName = `cerbos_${version}_${runningEnvironment.os}_${runningEnvironment.architecture}.tar.gz`
  const {data: releases} = await octokit.request(
    'GET /repos/{owner}/{repo}/releases',
    {
      owner: 'cerbos',
      repo: 'cerbos'
    }
  )
  core.info(`Looking for asset ${assetName} in Cerbos releases.`)
  for (const release of releases) {
    for (const asset of release.assets) {
      if (asset.name === assetName) {
        return asset.browser_download_url
      }
    }
  }
  core.setFailed(`Couldn't find the release asset with version ${version}`)
  process.exit(1)
}
export default getURLToDownload
