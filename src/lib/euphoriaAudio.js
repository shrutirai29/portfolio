// BTS Instrumental Playlist Controller
// Sequential tracks: Euphoria -> Life Goes On -> Still With You -> Magic Shop
// Features: Auto-play on arrival & first gesture, tab-visibility pause/resume, sequential playback

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
    this.volume = 0.5;
    this.fadeInterval = null;
    this.listeners = new Set();
    this.hasUserInteracted = false;
    this.listenersArmed = false;
    this.boundGestureHandler = null;
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

      // Sequential auto-play when track ends
      this.audio.addEventListener('ended', () => {
        this.next();
      });

      // Pause when switching tabs, resume when returning
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
      // Audio setup fallback
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
    if (!this.audio) return;

    // 1. Try immediate unmuted play (succeeds if user already visited or browser allows)
    const promise = this.audio.play();
    if (promise !== undefined && promise !== null) {
      promise
        .then(() => {
          this.isPlaying = true;
          this.hasUserInteracted = true;
          this.notify();
        })
        .catch(() => {
          // Blocked by browser autoplay policy -> arm persistent gesture listeners
          this.armGestureListeners();
        });
    } else {
      this.armGestureListeners();
    }
  }

  armGestureListeners() {
    if (this.listenersArmed) return;
    this.listenersArmed = true;

    const events = ['click', 'pointerdown', 'mousedown', 'touchstart', 'touchend', 'keydown'];

    this.boundGestureHandler = () => {
      if (this.isPlaying) {
        this.removeGestureListeners();
        return;
      }

      this.play().then((started) => {
        if (started) {
          this.hasUserInteracted = true;
          this.removeGestureListeners();
        }
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, this.boundGestureHandler, { capture: true, passive: true });
      document.addEventListener(evt, this.boundGestureHandler, { capture: true, passive: true });
    });
  }

  removeGestureListeners() {
    if (!this.listenersArmed || !this.boundGestureHandler) return;
    const events = ['click', 'pointerdown', 'mousedown', 'touchstart', 'touchend', 'keydown'];
    events.forEach((evt) => {
      window.removeEventListener(evt, this.boundGestureHandler, { capture: true });
      document.removeEventListener(evt, this.boundGestureHandler, { capture: true });
    });
    this.listenersArmed = false;
    this.boundGestureHandler = null;
  }

  play() {
    this.init();
    if (!this.audio) return Promise.resolve(false);

    clearInterval(this.fadeInterval);
    this.audio.volume = 0.08;

    const promise = this.audio.play();
    if (promise !== undefined && promise !== null) {
      return promise
        .then(() => {
          this.isPlaying = true;
          this.notify();
          let v = 0.08;
          this.fadeInterval = setInterval(() => {
            v += 0.05;
            if (v >= this.volume) {
              v = this.volume;
              clearInterval(this.fadeInterval);
            }
            if (this.audio) this.audio.volume = v;
          }, 45);
          return true;
        })
        .catch(() => {
          this.isPlaying = false;
          this.notify();
          return false;
        });
    }
    return Promise.resolve(false);
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
