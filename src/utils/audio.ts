/**
 * Web Audio API Audio Engine
 * Generates procedural cinematic atmospheric audio and realistic mechanical SFX
 * Zero external asset dependency - 100% reliable and instantaneous.
 */

class AudioController {
  private ctx: AudioContext | null = null;
  private isAmbientPlaying = false;
  private isMuted = false;
  private ambientGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private ambientLfo: OscillatorNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.6, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.6, this.ctx.currentTime, 0.05);
    }
  }

  public isAudioMuted(): boolean {
    return this.isMuted;
  }

  public isAmbientActive(): boolean {
    return this.isAmbientPlaying;
  }

  /**
   * Starts warm, deep cinematic space ambient drone using detuned additive synthesis
   */
  public startAmbient() {
    if (this.isAmbientPlaying) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 3.5);

      // Warm low-pass filter with gentle resonance
      this.ambientFilter = this.ctx.createBiquadFilter();
      this.ambientFilter.type = 'lowpass';
      this.ambientFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
      this.ambientFilter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      // Stereo panner if supported, else direct connect
      this.ambientFilter.connect(this.ambientGain);
      this.ambientGain.connect(this.masterGain);

      // Cinematic chord drone frequencies: D1 (36.7Hz), A1 (55Hz), D2 (73.4Hz), F#2 (92.5Hz), A2 (110Hz)
      const baseFreqs = [55.0, 55.3, 110.0, 110.4, 164.8, 220.0];
      this.ambientOscillators = [];

      baseFreqs.forEach((freq, idx) => {
        if (!this.ctx || !this.ambientFilter) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Detune subtle drift
        const detuneAmount = (idx - 2.5) * 4.5;
        osc.detune.setValueAtTime(detuneAmount, this.ctx.currentTime);

        oscGain.gain.setValueAtTime(0.2 / baseFreqs.length, this.ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.ambientFilter);
        osc.start();
        this.ambientOscillators.push(osc);
      });

      // LFO for slow breathing filter modulation (0.12 Hz cycle ~ 8 seconds)
      this.ambientLfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.ambientLfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(140, this.ctx.currentTime); // mod depth
      this.ambientLfo.connect(lfoGain);
      lfoGain.connect(this.ambientFilter.frequency);
      this.ambientLfo.start();

      this.isAmbientPlaying = true;
    } catch {
      // Audio context might be restricted before gesture
    }
  }

  public stopAmbient() {
    if (!this.isAmbientPlaying || !this.ctx || !this.ambientGain) return;
    try {
      this.ambientGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.8);
      setTimeout(() => {
        this.ambientOscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch { /* ignore */ }
        });
        this.ambientOscillators = [];
        if (this.ambientLfo) {
          try { this.ambientLfo.stop(); this.ambientLfo.disconnect(); } catch { /* ignore */ }
          this.ambientLfo = null;
        }
        this.isAmbientPlaying = false;
      }, 1000);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  public toggleAmbient(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  /**
   * Sound Effect: Explosion / Disassembly
   * Mechanical click, deep cinematic sub pulse, high metallic whoosh
   */
  public playExplosion() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Mechanical unlatch click (micro burst)
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = 'square';
      clickOsc.frequency.setValueAtTime(1800, now);
      clickOsc.frequency.exponentialRampToValueAtTime(120, now + 0.04);
      clickGain.gain.setValueAtTime(0.35, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      clickOsc.connect(clickGain);
      clickGain.connect(this.masterGain);
      clickOsc.start(now);
      clickOsc.stop(now + 0.06);

      // 2. Deep Sub Bass Impact / Release Wave (120Hz down to 38Hz)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(36, now + 0.9);
      subGain.gain.setValueAtTime(0.55, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      subOsc.connect(subGain);
      subGain.connect(this.masterGain);
      subOsc.start(now);
      subOsc.stop(now + 1.3);

      // 3. Metallic whoosh/servo sliding release (filtered noise buffer)
      const bufferSize = this.ctx.sampleRate * 0.8;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1200, now);
      bandpass.frequency.exponentialRampToValueAtTime(3200, now + 0.4);
      bandpass.frequency.exponentialRampToValueAtTime(400, now + 0.8);
      bandpass.Q.setValueAtTime(4.0, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.linearRampToValueAtTime(0.2, now + 0.15);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      whiteNoise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.85);
    } catch {
      // Ignore audio error
    }
  }

  /**
   * Sound Effect: Reassembly / Magnetic Lock
   * Reverse servo whoosh, magnetic suction chord, solid latch click
   */
  public playReassemble() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Inward suction swell (freq rising from 50Hz to 280Hz)
      const swellOsc = this.ctx.createOscillator();
      const swellGain = this.ctx.createGain();
      swellOsc.type = 'triangle';
      swellOsc.frequency.setValueAtTime(55, now);
      swellOsc.frequency.exponentialRampToValueAtTime(260, now + 0.7);
      swellGain.gain.setValueAtTime(0.05, now);
      swellGain.gain.linearRampToValueAtTime(0.35, now + 0.65);
      swellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
      swellOsc.connect(swellGain);
      swellGain.connect(this.masterGain);
      swellOsc.start(now);
      swellOsc.stop(now + 0.76);

      // 2. High metallic magnetic snap (at t + 0.68s)
      const snapTime = now + 0.68;
      const snapOsc = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snapOsc.type = 'sawtooth';
      snapOsc.frequency.setValueAtTime(2400, snapTime);
      snapOsc.frequency.exponentialRampToValueAtTime(300, snapTime + 0.08);
      snapGain.gain.setValueAtTime(0.4, snapTime);
      snapGain.gain.exponentialRampToValueAtTime(0.001, snapTime + 0.09);
      snapOsc.connect(snapGain);
      snapGain.connect(this.masterGain);
      snapOsc.start(snapTime);
      snapOsc.stop(snapTime + 0.1);

      // 3. Low locking latch thud
      const thudOsc = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thudOsc.type = 'sine';
      thudOsc.frequency.setValueAtTime(110, snapTime);
      thudOsc.frequency.exponentialRampToValueAtTime(45, snapTime + 0.2);
      thudGain.gain.setValueAtTime(0.5, snapTime);
      thudGain.gain.exponentialRampToValueAtTime(0.001, snapTime + 0.25);
      thudOsc.connect(thudGain);
      thudGain.connect(this.masterGain);
      thudOsc.start(snapTime);
      thudOsc.stop(snapTime + 0.3);
    } catch {
      // Ignore
    }
  }

  /**
   * Subtle hover feedback tick
   */
  public playHover() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.025);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Ignore
    }
  }

  /**
   * Tactile button switch click
   */
  public playClick() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.035);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignore
    }
  }
}

export const audioService = new AudioController();
