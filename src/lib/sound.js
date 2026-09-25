// Procedural Web Audio API sound effects (no external audio files needed)
// Elegant, minimal synth chimes with gentle low-pass filtering and subtle volume.

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = true; // Muted by default for optimal UX
    this.droneOsc = null;
    this.droneGain = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch {
      // AudioContext not supported or restricted
    }
  }

  toggleMute() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.muted = !this.muted;
    if (this.muted) {
      this.stopAmbient();
    } else {
      this.playChime(660, 0.08);
      this.startAmbient();
    }
    return !this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playHover() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.04);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // ignore audio errors
    }
  }

  playChime(freq = 587.33, dur = 0.25) {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + dur);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + dur);
    } catch {
      // ignore
    }
  }

  startAmbient() {
    if (this.muted || !this.ctx || this.droneOsc) return;
    try {
      const now = this.ctx.currentTime;
      this.droneOsc = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);

      this.droneOsc.type = 'sine';
      this.droneOsc.frequency.setValueAtTime(65.41, now); // Low C2 drone

      this.droneGain.gain.setValueAtTime(0.0001, now);
      this.droneGain.gain.linearRampToValueAtTime(0.02, now + 2);

      this.droneOsc.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc.start(now);
    } catch {
      // ignore
    }
  }

  stopAmbient() {
    if (!this.droneOsc || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      if (this.droneGain) {
        this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
      }
      setTimeout(() => {
        if (this.droneOsc) {
          try {
            this.droneOsc.stop();
            this.droneOsc.disconnect();
          } catch {
            // ignore
          }
          this.droneOsc = null;
          this.droneGain = null;
        }
      }, 500);
    } catch {
      this.droneOsc = null;
    }
  }
}

export const sounds = new SoundManager();
