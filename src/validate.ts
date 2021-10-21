import * as core from '@actions/core'
import * as os from 'os'

async function validate(): Promise<void> {
  switch (os.platform()) {
    case 'linux':
      core.info(`OS: ${os.platform()}`)
      break
    default:
      core.setFailed('Unsupported operating system')
      return
  }
}

export default validate
