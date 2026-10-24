class SoundController {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private isAmbientPlaying = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isSoundEnabled(): boolean {
    return localStorage.getItem('techwear_sound') !== 'false';
  }

  public toggleSound(): boolean {
    const nextState = !this.isSoundEnabled();
    localStorage.setItem('techwear_sound', nextState ? 'true' : 'false');
    if (!nextState && this.isAmbientPlaying) {
      this.stopAmbient();
    }
    return nextState;
  }

  public isAmbientEnabled(): boolean {
    return localStorage.getItem('techwear_ambient') !== 'false';
  }

  public isAmbientActive(): boolean {
    return this.isAmbientPlaying;
  }

  public playClick(): void {
    if (!this.isSoundEnabled()) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio playback error gracefully ignored
    }
  }

  public playOpen(): void {
    if (!this.isSoundEnabled()) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio playback error gracefully ignored
    }
  }

  public playClose(): void {
    if (!this.isSoundEnabled()) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Audio playback error gracefully ignored
    }
  }

  public playSuccess(): void {
    if (!this.isSoundEnabled()) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const notes = [523.25, 783.99]; // C5, G5
      notes.forEach((freq, idx) => {
        const start = ctx.currentTime + idx * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.1, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.18);
      });
    } catch {
      // Audio playback error gracefully ignored
    }
  }

  public playAlert(): void {
    if (!this.isSoundEnabled()) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Audio playback error gracefully ignored
    }
  }

  public startAmbient(): void {
    if (!this.isSoundEnabled() || !this.isAmbientEnabled() || this.isAmbientPlaying) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      this.stopAmbient();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 2);
      masterGain.connect(ctx.destination);
      this.ambientGain = masterGain;

      const freqs = [55, 110]; // Low frequency ambient drone
      this.ambientOscillators = freqs.map((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.connect(masterGain);
        osc.start();
        return osc;
      });

      this.isAmbientPlaying = true;
    } catch {
      // Audio playback error gracefully ignored
    }
  }

  public stopAmbient(): void {
    if (!this.isAmbientPlaying && !this.ambientGain) return;
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      }
      setTimeout(() => {
        this.ambientOscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        this.ambientOscillators = [];
        this.ambientGain = null;
        this.isAmbientPlaying = false;
      }, 500);
    } catch {
      this.ambientOscillators = [];
      this.ambientGain = null;
      this.isAmbientPlaying = false;
    }
  }

  public toggleAmbient(): boolean {
    const currentState = this.isAmbientEnabled();
    const nextState = !currentState;
    localStorage.setItem('techwear_ambient', nextState ? 'true' : 'false');
    if (nextState) {
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
    return nextState;
  }
}

export const AudioService = new SoundController();
