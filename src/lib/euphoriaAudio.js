// BTS Instrumental Playlist Controller
// Sequential tracks: Euphoria -> Life Goes On -> Still With You -> Magic Shop
// Features: Auto-play on first touch/scroll, tab-visibility pause/resume, sequential playback

const PLAYLIST = [
  { id: 'euphoria', title: 'Euphoria', file: 'euphoria.mp3' },
  { id: 'life_goes_on', title: 'Life Goes On', file: 'life_goes_on.mp3' },
  { id: 'still_with_you', title: 'Still With You', file: 'still_with_you.mp3' },
  { id: 'magic_shop', title: 'Magic Shop', file: 'magic_shop.mp3' },
];

class BTSPlaylistController {
  constructor() {
    this.audio = null;
    this.currentIndex = 0;
    this.isPlaying = false;
    this.wasPlayingBeforeHidden = false;
    this.volume = 0.45;
    this.fadeInterval = null;
    this.listeners = new Set();
    this.hasUserInteracted = false;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback({
      isPlaying: this.isPlaying,
      currentTrack: PLAYLIST[this.currentIndex],
      currentIndex: this.currentIndex,
    });
    return () => this.listeners.delete(callback);
  }

  notify() {
    const state = {
      isPlaying: this.isPlaying,
      currentTrack: PLAYLIST[this.currentIndex],
      currentIndex: this.currentIndex,
    };
    this.listeners.forEach((fn) => fn(state));
  }

  init() {
    if (this.audio) return;
    try {
      this.audio = new Audio();
      this.audio.preload = 'auto';
      this.audio.volume = this.volume;

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      // Play next song automatically when current one ends
      this.audio.addEventListener('ended', () => {
        this.next();
      });

      // Handle Tab Visibility: pause when user switches to other tabs, resume when returning
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (this.isPlaying) {
            this.wasPlayingBeforeHidden = true;
            this.pause(false);
          }
        } else {
          if (this.wasPlayingBeforeHidden) {
            this.wasPlayingBeforeHidden = false;
            this.play();
          }
        }
      });

      this.loadTrack(this.currentIndex);
    } catch {
      // Audio error handling
    }
  }

  loadTrack(index) {
    this.currentIndex = (index + PLAYLIST.length) % PLAYLIST.length;
    const track = PLAYLIST[this.currentIndex];
    const src = `${import.meta.env.BASE_URL}audio/${track.file}`;
    if (this.audio) {
      this.audio.src = src;
      this.notify();
    }
  }

  startAutoplayOnArrival() {
    this.init();

    // 1. Try immediate play (works in browsers that allow autoplay or on reload)
    const promise = this.audio ? this.audio.play() : null;
    if (promise !== undefined && promise !== null) {
      promise
        .then(() => {
          this.isPlaying = true;
          this.hasUserInteracted = true;
          this.notify();
        })
        .catch(() => {
          // 2. If blocked by browser autoplay policy, arm listener on first scroll or touch
          const onFirstInteraction = () => {
            if (this.hasUserInteracted) return;
            this.hasUserInteracted = true;
            this.play();
            window.removeEventListener('pointerdown', onFirstInteraction);
            window.removeEventListener('scroll', onFirstInteraction);
            window.removeEventListener('keydown', onFirstInteraction);
            window.removeEventListener('wheel', onFirstInteraction);
          };

          window.addEventListener('pointerdown', onFirstInteraction, { once: true, passive: true });
          window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true });
          window.addEventListener('keydown', onFirstInteraction, { once: true, passive: true });
          window.addEventListener('wheel', onFirstInteraction, { once: true, passive: true });
        });
    }
  }

  toggle() {
    this.init();
    if (!this.audio) return false;

    if (this.isPlaying) {
      this.pause(true);
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

    const promise = this.audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          this.isPlaying = true;
          this.notify();
          let v = 0.05;
          this.fadeInterval = setInterval(() => {
            v += 0.05;
            if (v >= this.volume) {
              v = this.volume;
              clearInterval(this.fadeInterval);
            }
            if (this.audio) this.audio.volume = v;
          }, 50);
        })
        .catch(() => {});
    }
  }

  pause(userInitiated = true) {
    if (!this.audio) return;
    if (userInitiated) {
      this.wasPlayingBeforeHidden = false;
    }
    clearInterval(this.fadeInterval);

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
    }, 30);
  }

  next() {
    this.loadTrack(this.currentIndex + 1);
    this.play();
  }

  prev() {
    this.loadTrack(this.currentIndex - 1);
    this.play();
  }
}

export const euphoriaAudio = new BTSPlaylistController();
export const BTS_PLAYLIST = PLAYLIST;
