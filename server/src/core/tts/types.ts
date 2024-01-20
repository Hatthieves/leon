import type AmazonPollySynthesizer from '@/core/tts/synthesizers/amazon-polly-synthesizer'
import type FliteSynthesizer from '@/core/tts/synthesizers/flite-synthesizer'
import type GoogleCloudTTSSynthesizer from '@/core/tts/synthesizers/google-cloud-tts-synthesizer'
import type WatsonTTSSynthesizer from '@/core/tts/synthesizers/watson-tts-synthesizer'
import type FestivalSynthesizer from '@/core/tts/synthesizers/festival-synthesizer'

export enum TTSProviders {
  AmazonPolly = 'amazon-polly',
  GoogleCloudTTS = 'google-cloud-tts',
  WatsonTTS = 'watson-tts',
  Flite = 'flite',
  Festival = 'festival'
}

export enum TTSSynthesizers {
  AmazonPolly = 'amazon-polly-synthesizer',
  GoogleCloudTTS = 'google-cloud-tts-synthesizer',
  WatsonTTS = 'watson-tts-synthesizer',
  Flite = 'flite-synthesizer',
  Festival = 'festival-synthesizer'
}

export interface SynthesizeResult {
  audioFilePath: string
  duration: number
}

export type TTSSynthesizer =
  | AmazonPollySynthesizer
  | FliteSynthesizer
  | FestivalSynthesizer
  | GoogleCloudTTSSynthesizer
  | WatsonTTSSynthesizer
  | undefined
