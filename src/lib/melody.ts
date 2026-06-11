let audio: HTMLAudioElement | null = null

export function startMelody() {
  if (audio) return
  audio = new Audio('/sound.mp3')
  audio.loop = true
  audio.volume = 0.5
  audio.play().catch(() => {
    // autoplay blocked - will retry on next interaction
  })
}

export function stopMelody() {
  if (audio) {
    audio.pause()
    audio = null
  }
}
