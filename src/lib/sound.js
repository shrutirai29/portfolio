import { euphoriaAudio } from './euphoriaAudio.js';

class SoundProxy {
  toggleMute() {
    return euphoriaAudio.toggle();
  }

  isMuted() {
    return !euphoriaAudio.isPlaying;
  }

  playHover() {
    // Pure silence on hover as requested - only Euphoria instrumental plays
  }

  playChime() {
    // Pure silence - only Euphoria instrumental plays
  }
}

export const sounds = new SoundProxy();
