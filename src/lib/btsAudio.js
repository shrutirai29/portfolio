// Procedural BTS Music Engine — Synthesizes iconic BTS melodies with warm music-box / piano harmonics
// Borahae 💜 curated tracks: Spring Day, Mikrokosmos, Euphoria, Magic Shop

const BTS_TRACKS = [
  {
    id: 'spring_day',
    title: 'Spring Day (봄날)',
    bpm: 76,
    notes: [
      // "Bogoshipda... ireohke marhanikka deo..." (Chorus / Iconic Intro)
      { note: 'G4', dur: 0.5 },
      { note: 'Bb4', dur: 0.5 },
      { note: 'C5', dur: 0.75 },
      { note: 'Bb4', dur: 0.5 },
      { note: 'G4', dur: 0.5 },
      { note: 'F4', dur: 0.8 },
      { note: 'Eb4', dur: 0.5 },
      { note: 'F4', dur: 0.5 },
      { note: 'G4', dur: 0.75 },
      { note: 'F4', dur: 0.5 },
      { note: 'Eb4', dur: 0.5 },
      { note: 'D4', dur: 0.8 },
      // Second phrase
      { note: 'Eb4', dur: 0.5 },
      { note: 'G4', dur: 0.5 },
      { note: 'Bb4', dur: 0.75 },
      { note: 'C5', dur: 0.5 },
      { note: 'D5', dur: 0.8 },
      { note: 'C5', dur: 0.5 },
      { note: 'Bb4', dur: 0.5 },
      { note: 'G4', dur: 0.75 },
      { note: 'F4', dur: 0.5 },
      { note: 'Eb4', dur: 1.2 },
    ],
    chords: [
      { chord: ['Eb3', 'Bb3', 'Eb4'], dur: 2.2 },
      { chord: ['G3', 'D4', 'G4'], dur: 2.2 },
      { chord: ['Ab3', 'Eb4', 'Ab4'], dur: 2.2 },
      { chord: ['Bb3', 'F4', 'Bb4'], dur: 2.2 },
    ],
  },
  {
    id: 'mikrokosmos',
    title: 'Mikrokosmos (소우주)',
    bpm: 88,
    notes: [
      // Sparkling starlight melody
      { note: 'D5', dur: 0.4 },
      { note: 'E5', dur: 0.4 },
      { note: 'F#5', dur: 0.6 },
      { note: 'A5', dur: 0.6 },
      { note: 'F#5', dur: 0.4 },
      { note: 'E5', dur: 0.4 },
      { note: 'D5', dur: 0.8 },
      // "Shine, dream, smile..."
      { note: 'B4', dur: 0.4 },
      { note: 'D5', dur: 0.4 },
      { note: 'E5', dur: 0.6 },
      { note: 'D5', dur: 0.4 },
      { note: 'B4', dur: 0.4 },
      { note: 'A4', dur: 0.8 },
      { note: 'D5', dur: 0.4 },
      { note: 'F#5', dur: 0.6 },
      { note: 'A5', dur: 0.6 },
      { note: 'B5', dur: 0.8 },
      { note: 'A5', dur: 0.6 },
      { note: 'F#5', dur: 0.8 },
      { note: 'E5', dur: 1.2 },
    ],
    chords: [
      { chord: ['D3', 'A3', 'D4'], dur: 2.0 },
      { chord: ['B2', 'F#3', 'B3'], dur: 2.0 },
      { chord: ['G2', 'D3', 'G3'], dur: 2.0 },
      { chord: ['A2', 'E3', 'A3'], dur: 2.0 },
    ],
  },
  {
    id: 'euphoria',
    title: 'Euphoria (유포리아)',
    bpm: 92,
    notes: [
      // "You are the cause of my euphoria..."
      { note: 'F4', dur: 0.4 },
      { note: 'A4', dur: 0.4 },
      { note: 'C5', dur: 0.6 },
      { note: 'D5', dur: 0.4 },
      { note: 'C5', dur: 0.6 },
      { note: 'A4', dur: 0.4 },
      { note: 'G4', dur: 0.8 },
      { note: 'F4', dur: 0.4 },
      { note: 'A4', dur: 0.4 },
      { note: 'C5', dur: 0.6 },
      { note: 'F5', dur: 0.8 },
      { note: 'E5', dur: 0.4 },
      { note: 'D5', dur: 0.4 },
      { note: 'C5', dur: 1.2 },
    ],
    chords: [
      { chord: ['F3', 'C4', 'F4'], dur: 1.8 },
      { chord: ['A3', 'E4', 'A4'], dur: 1.8 },
      { chord: ['D3', 'A3', 'D4'], dur: 1.8 },
      { chord: ['Bb2', 'F3', 'Bb3'], dur: 1.8 },
    ],
  },
];

// Note to Frequency mapping (Hz)
const NOTE_FREQ = {
  B2: 123.47, C3: 130.81, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61, 'F#3': 185.0, G3: 196.0, Ab3: 207.65, A3: 220.0, Bb3: 233.08, B3: 246.94,
  C4: 261.63, 'C#4': 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, 'F#4': 369.99, G4: 392.0, Ab4: 415.3, A4: 440.0, Bb4: 466.16, B4: 493.88,
  C5: 523.25, 'C#5': 554.37, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, 'F#5': 739.99, G5: 783.99, Ab5: 830.61, A5: 880.0, Bb5: 932.33, B5: 987.77,
  C6: 1046.5,
};

class BTSAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.timeoutId = null;
    this.masterGain = null;
    this.volume = 0.55;
    this.activeNodes = [];
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    const state = {
      isPlaying: this.isPlaying,
      currentTrack: BTS_TRACKS[this.currentTrackIndex],
      volume: this.volume,
    };
    this.listeners.forEach((fn) => fn(state));
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    } catch {
      // AudioContext not supported
    }
  }

  toggle() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  play() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.notify();
    this.scheduleSequence();
  }

  stop() {
    this.isPlaying = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.activeNodes.forEach((node) => {
      try {
        node.stop();
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.activeNodes = [];
    this.notify();
  }

  setTrack(index) {
    this.currentTrackIndex = (index + BTS_TRACKS.length) % BTS_TRACKS.length;
    if (this.isPlaying) {
      this.stop();
      this.play();
    } else {
      this.notify();
    }
  }

  nextTrack() {
    this.setTrack(this.currentTrackIndex + 1);
  }

  prevTrack() {
    this.setTrack(this.currentTrackIndex - 1);
  }

  // Warm Music Box / Electric Piano note synthesizer
  playTone(freq, duration = 0.5, type = 'sine', gainMultiplier = 0.12) {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator(); // Sub-harmonic for warmth
      const gainNode = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Warm tone filtering (gentle lowpass to remove sharp digital harshness)
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(1.5, now);

      osc.type = 'triangle'; // Sweet, music-box bell timbre
      osc.frequency.setValueAtTime(freq, now);

      osc2.type = 'sine'; // Pure round base tone
      osc2.frequency.setValueAtTime(freq, now);

      const targetGain = gainMultiplier * this.volume;

      // Soft music-box envelope: fast soft attack, singing sustain, gentle decay
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.035);
      gainNode.gain.exponentialRampToValueAtTime(targetGain * 0.4, now + duration * 0.4);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.1);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc2.start(now);

      const stopTime = now + duration * 1.15;
      osc.stop(stopTime);
      osc2.stop(stopTime);

      this.activeNodes.push(osc, osc2);
      setTimeout(() => {
        const i1 = this.activeNodes.indexOf(osc);
        if (i1 !== -1) this.activeNodes.splice(i1, 1);
        const i2 = this.activeNodes.indexOf(osc2);
        if (i2 !== -1) this.activeNodes.splice(i2, 1);
      }, duration * 1200);
    } catch {
      // ignore
    }
  }

  scheduleSequence() {
    if (!this.isPlaying) return;
    const track = BTS_TRACKS[this.currentTrackIndex];
    let noteDelay = 0;

    track.notes.forEach((item) => {
      const freq = NOTE_FREQ[item.note] || 440;
      setTimeout(() => {
        if (this.isPlaying) {
          this.playTone(freq, item.dur * 0.9, 'triangle', 0.15);
        }
      }, noteDelay * 1000);
      noteDelay += item.dur;
    });

    // Loop the melody seamlessly
    this.timeoutId = setTimeout(() => {
      if (this.isPlaying) {
        this.scheduleSequence();
      }
    }, (noteDelay + 1.2) * 1000);
  }

  // Soft purple chime for button/link hover
  playHoverChime() {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5 gentle bell
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.05); // D6

      gain.gain.setValueAtTime(0.02 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // ignore
    }
  }
}

export const btsAudio = new BTSAudioEngine();
export const TRACKS = BTS_TRACKS;
