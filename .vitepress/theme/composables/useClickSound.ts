/**
 * A gentle, synthesized click: a short filtered noise burst (the "tick")
 * under a soft, quickly decaying tone (the "body"). No audio file is
 * shipped; everything is generated with the Web Audio API on demand.
 */

export interface ClickSoundOptions {
  /**
   * Pitch of the tone at the start of the click, in Hz.
   * Higher is brighter; lower is duller.
   * @default 900
   */
  pitch: number
  /**
   * Pitch the tone falls to by the end of the click, in Hz.
   * Set it equal to "pitch" for a flat tone.
   * @default 420
   */
  pitchEnd: number
  /**
   * Center frequency of the noise burst, in Hz.
   * Higher is a sharper, more "plastic" tick.
   * @default 2400
   */
  tickFrequency: number
  /**
   * Length of the tick noise burst, in seconds.
   * @default 0.015
   */
  tickDuration: number
  /**
   * Total length of the click, in seconds.
   * @default 0.06
   */
  duration: number
  /**
   * Peak loudness, from 0 (silent) to 1.
   * @default 0.12
   */
  volume: number
}

export const DEFAULT_CLICK_SOUND: ClickSoundOptions = {
  pitch: 900,
  pitchEnd: 420,
  tickFrequency: 2400,
  tickDuration: 0.015,
  duration: 0.06,
  volume: 0.12,
}

/**
 * Gain the envelopes fade to. "exponentialRampToValueAtTime" cannot
 * reach zero, so this is the closest thing to silence.
 */
const SILENCE = 0.001

let audioContext: AudioContext | null = null
let noiseBuffer: AudioBuffer | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined' || !('AudioContext' in window)) {
    return null
  }

  audioContext ??= new AudioContext()
  return audioContext
}

function getNoiseBuffer(context: AudioContext, duration: number): AudioBuffer {
  const length = Math.ceil(context.sampleRate * duration)

  if (
    noiseBuffer &&
    noiseBuffer.sampleRate === context.sampleRate &&
    noiseBuffer.length >= length
  ) {
    return noiseBuffer
  }

  noiseBuffer = context.createBuffer(1, length, context.sampleRate)
  const samples = noiseBuffer.getChannelData(0)

  for (let index = 0; index < length; index++) {
    samples[index] = Math.random() * 2 - 1
  }

  return noiseBuffer
}

/**
 * @param options Tuning for the click; anything omitted keeps its default.
 * The returned player also accepts overrides per call, e.g. to play the
 * same click a little lower when switching to the dark theme.
 */
export function useClickSound(options: Partial<ClickSoundOptions> = {}): {
  playClickSound: (overrides?: Partial<ClickSoundOptions>) => void
} {
  const playClickSound = (overrides: Partial<ClickSoundOptions> = {}): void => {
    const context = getAudioContext()

    if (!context) {
      return
    }

    const sound: ClickSoundOptions = {
      ...DEFAULT_CLICK_SOUND,
      ...options,
      ...overrides,
    }

    // Browsers start the context suspended until a user gesture;
    // this runs inside a click so resuming is allowed.
    if (context.state === 'suspended') {
      void context.resume()
    }

    const now = context.currentTime
    const end = now + sound.duration

    const output = context.createGain()
    output.gain.setValueAtTime(sound.volume, now)
    output.gain.exponentialRampToValueAtTime(SILENCE, end)
    output.connect(context.destination)

    // Tick: band-passed noise, gone in a few milliseconds.
    const tick = context.createBufferSource()
    tick.buffer = getNoiseBuffer(context, sound.duration)
    const tickFilter = context.createBiquadFilter()
    tickFilter.type = 'bandpass'
    tickFilter.frequency.value = sound.tickFrequency
    tickFilter.Q.value = 1.2
    const tickGain = context.createGain()
    tickGain.gain.setValueAtTime(1, now)
    tickGain.gain.exponentialRampToValueAtTime(SILENCE, now + sound.tickDuration)
    tick.connect(tickFilter)
    tickFilter.connect(tickGain)
    tickGain.connect(output)

    // Body: a soft tone dropping in pitch, like a small mechanical switch.
    const body = context.createOscillator()
    body.type = 'sine'
    body.frequency.setValueAtTime(sound.pitch, now)
    body.frequency.exponentialRampToValueAtTime(sound.pitchEnd, end)
    const bodyGain = context.createGain()
    bodyGain.gain.setValueAtTime(0.6, now)
    bodyGain.gain.exponentialRampToValueAtTime(SILENCE, end)
    body.connect(bodyGain)
    bodyGain.connect(output)

    tick.start(now)
    body.start(now)
    tick.stop(end)
    body.stop(end)
  }

  return { playClickSound }
}
