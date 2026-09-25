import { btsAudio } from './btsAudio.js';

class SoundProxy {
  toggleMute() {
    return btsAudio.toggle();
  }

  isMuted() {
    return !btsAudio.isPlaying;
  }

  playHover() {
    if (btsAudio.isPlaying) {
      btsAudio.playHoverChime();
    }
  }

  playChime(freq, dur) {
    if (btsAudio.isPlaying) {
      btsAudio.playTone(freq, dur, 'triangle', 0.1);
    }
  }
}

export const sounds = new SoundProxy();
