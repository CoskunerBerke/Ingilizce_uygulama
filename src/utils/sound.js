// Web Audio API Synthesizer for Game Sound Effects + Web Speech API for English Pronunciation

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, delay = 0, volume = 0.12) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + delay;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.02);
    } catch {
      // Ignore audio errors on restricted browsers
    }
  }

  playCorrect(combo = 1) {
    const boost = Math.min(combo - 1, 5) * 40;
    this.playTone(523.25 + boost, 'triangle', 0.12, 0, 0.15); // C5
    this.playTone(659.25 + boost, 'triangle', 0.16, 0.08, 0.15); // E5
    this.playTone(783.99 + boost, 'triangle', 0.25, 0.16, 0.18); // G5
  }

  playWrong() {
    this.playTone(220, 'sawtooth', 0.18, 0, 0.1);
    this.playTone(165, 'sawtooth', 0.28, 0.14, 0.12);
  }

  playClick() {
    this.playTone(600, 'sine', 0.05, 0, 0.06);
  }

  playFlip() {
    this.playTone(440, 'sine', 0.07, 0, 0.07);
    this.playTone(587.33, 'sine', 0.09, 0.04, 0.07);
  }

  playVictory() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      this.playTone(n, 'triangle', 0.22, idx * 0.1, 0.16);
    });
  }

  speak(text, slow = false) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = slow ? 0.65 : 0.95;
      utterance.pitch = 1;
      const voices = window.speechSynthesis.getVoices();
      const enVoice =
        voices.find((v) => v.lang === 'en-US' && v.name.includes('Google')) ||
        voices.find((v) => v.lang.startsWith('en-US')) ||
        voices.find((v) => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors
    }
  }
}

export const sound = new SoundManager();
