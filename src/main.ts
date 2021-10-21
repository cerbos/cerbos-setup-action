import download from './download'
import validate from './validate'

async function run(): Promise<void> {
  await validate()
  await download()
}

run()
