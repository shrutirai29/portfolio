// Studio-quality BTS Euphoria Instrumental Audio Controller
// Plays the authentic "Euphoria (Instrumental)" audio file with gentle fade in/out.

class EuphoriaAudioController {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.volume = 0.45;
    this.fadeInterval = null;
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.isPlaying);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  init() {
    if (this.audio) return;
    try {
      const src = `${import.meta.env.BASE_URL}audio/euphoria.mp3`;
      this.audio = new Audio(src);
      this.audio.loop = true;
      this.audio.volume = this.volume;
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });
    } catch {
      // Audio error handling
    }
  }

  toggle() {
    this.init();
    if (!this.audio) return false;

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  play() {
    this.init();
    if (!this.audio) return;

    clearInterval(this.fadeInterval);
    this.audio.volume = 0.05;

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.notify();
          // Gentle fade in
          let v = 0.05;
          this.fadeInterval = setInterval(() => {
            v += 0.05;
            if (v >= this.volume) {
              v = this.volume;
              clearInterval(this.fadeInterval);
            }
            if (this.audio) this.audio.volume = v;
          }, 60);
        })
        .catch(() => {
          // Auto-play policy blocked
        });
    }
  }

  pause() {
    if (!this.audio) return;
    clearInterval(this.fadeInterval);

    // Gentle fade out
    let v = this.audio.volume;
    this.fadeInterval = setInterval(() => {
      v -= 0.08;
      if (v <= 0.05) {
        clearInterval(this.fadeInterval);
        if (this.audio) {
          this.audio.pause();
          this.audio.volume = this.volume;
        }
        this.isPlaying = false;
        this.notify();
      } else {
        if (this.audio) this.audio.volume = v;
      }
    }, 40);
  }
}

export const euphoriaAudio = new EuphoriaAudioController();
