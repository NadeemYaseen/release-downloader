//import * as core from '@actions/core'
import * as handlers from 'typed-rest-client/Handlers'
import * as inputHelper from './input-helper'
import * as thc from 'typed-rest-client/HttpClient'

import { ReleaseDownloader } from './release-downloader'
//import { extract } from './unarchive'

async function run(): Promise<void> {
  try {
    const downloadSettings = inputHelper.getInputs()
    const authToken = 'kkkkk'
    //const githubApiUrl = core.getInput('github-api-url')
    const githubApiUrl = 'https://api.github.com'

    const credentialHandler = new handlers.BearerCredentialHandler(
      authToken,
      false
    )
    const httpClient: thc.HttpClient = new thc.HttpClient('https://api.github.com', [
      credentialHandler
    ])

    const downloader = new ReleaseDownloader(httpClient, githubApiUrl)

    const res: string[] = await downloader.download(downloadSettings)

    if (downloadSettings.extractAssets) {
      for (const asset of res) {
        //await extract(asset, downloadSettings.outFilePath)
        console.log('not extracting')
      }
    }

    //core.info(`Done: ${res}`)
    console.info(`Done: ${res}`)
  } catch (error) {
    if (error instanceof Error) {
      //core.setFailed(error.message)
      console.error(error.message)
    }
  }
}

run()
