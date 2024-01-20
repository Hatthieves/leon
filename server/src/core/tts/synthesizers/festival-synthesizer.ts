import path from 'node:path'
import fs from 'node:fs'
import { execSync, spawn } from 'node:child_process'

import type { LongLanguageCode } from '@/types'
import type { SynthesizeResult } from '@/core/tts/types'
import { LANG, TMP_PATH } from '@/constants'
import { TTS } from '@/core'
import { TTSSynthesizerBase } from '@/core/tts/tts-synthesizer-base'
import { LogHelper } from '@/helpers/log-helper'
import { StringHelper } from '@/helpers/string-helper'

export default class FestivalSynthesizer extends TTSSynthesizerBase {
  protected readonly name = 'Festival TTS Synthesizer'
  protected readonly lang = LANG as LongLanguageCode

  constructor(lang: LongLanguageCode) {
    super()

    LogHelper.title(this.name)
    LogHelper.success('New instance')

    this.lang = lang
  }

  public async synthesize(speech: string): Promise<SynthesizeResult | null> {
    const audioFilePath = path.join(
      TMP_PATH,
      `${Date.now()}-${StringHelper.random(4)}.wav`
    )

    const textFilePath = path.join(
      TMP_PATH,
      `${Date.now()}-${StringHelper.random(4)}.txt`
    )

    const output = execSync(`echo "${speech}" | iconv -f utf-8 -t iso-8859-1`)
    fs.writeFileSync(textFilePath, output)

    const process = spawn('text2wave', [textFilePath, '-o', audioFilePath])

    await new Promise((resolve, reject) => {
      process.stdout.on('end', resolve)
      process.stderr.on('data', reject)
    })

    const duration = await this.getAudioDuration(audioFilePath)

    TTS.em.emit('saved', duration)

    fs.unlinkSync(textFilePath)

    return {
      audioFilePath,
      duration
    }
  }
}
