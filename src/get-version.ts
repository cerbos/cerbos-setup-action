// Copyright 2021-2024 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import {Octokit} from 'octokit'

async function getVersion(
  octokit: Octokit,
  inputVersion: string
): Promise<string> {
  if (inputVersion === '' || inputVersion === 'latest') {
    const {data: release} = await octokit.request(
      'GET /repos/{owner}/{repo}/releases/latest',
      {
        owner: 'cerbos',
        repo: 'cerbos'
      }
    )

    return release.tag_name.split('v')[1]
  } else {
    if (inputVersion.startsWith('v')) {
      return inputVersion.split('v')[1]
    } else {
      return inputVersion
    }
  }
}

export default getVersion
