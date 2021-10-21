// Copyright 2021 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as axios from 'axios'
import * as core from '@actions/core'

const https = axios.default

interface Release {
  tag_name: string
}

async function getLatestVersionTag(): Promise<string> {
  const url = 'https://api.github.com/repos/cerbos/cerbos/releases/latest'
  let response = {tag_name: ''} as Release

  try {
    response = (await https.get(url)).data as Release
  } catch (error) {
    core.setFailed(`Failed to fetch latest version tag. ${error}`)
  }

  return response.tag_name.split('v', 0)[1]
}

export default getLatestVersionTag
