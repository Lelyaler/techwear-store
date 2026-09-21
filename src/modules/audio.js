let audioCtx = null;
let isEnabled = localStorage.getItem('techwear_sound') !== 'false';
let isAmbientEnabled = localStorage.getItem('techwear_ambient') !== 'false';
let ambientOscs = [];
let ambientGain = null;
let isAmbientActive = false;
let ambientStopTimeout = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  
  return audioCtx;
};

const createOscillator = (type, freq, duration, gainStart, gainEnd = 0.001) => {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  
  gainNode.gain.setValueAtTime(gainStart, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(gainEnd, ctx.currentTime + duration);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  return { osc, gainNode, ctx };
};

export const AudioService = {
  isEnabled() {
    return localStorage.getItem('techwear_sound') !== 'false';
  },

  toggle() {
    const currentState = localStorage.getItem('techwear_sound') !== 'false';
    const nextState = !currentState;
    localStorage.setItem('techwear_sound', nextState ? 'true' : 'false');
    return nextState;
  },

  playClick() {
    if (localStorage.getItem('techwear_sound') === 'false') return;
    try {
      const { osc, ctx } = createOscillator('sine', 1200, 0.05, 0.08);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  },

  playSuccess() {
    if (localStorage.getItem('techwear_sound') === 'false') return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      
      const playNote = (freq, startOffset, duration) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + startOffset);
        
        gainNode.gain.setValueAtTime(0, now + startOffset);
        gainNode.gain.linearRampToValueAtTime(0.12, now + startOffset + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + startOffset + duration);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(now + startOffset);
        osc.stop(now + startOffset + duration);
      };

      playNote(523.25, 0, 0.15);
      playNote(783.99, 0.07, 0.25);
    } catch (e) {}
  },

  playError() {
    if (localStorage.getItem('techwear_sound') === 'false') return;
    try {
      const { osc, ctx } = createOscillator('sawtooth', 130, 0.25, 0.05);
      osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  },

  playOpen() {
    if (localStorage.getItem('techwear_sound') === 'false') return;
    try {
      const { osc, ctx } = createOscillator('triangle', 320, 0.25, 0.1);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  },

  isAmbientActive() {
    return isAmbientActive;
  },

  startAmbient() {
    if (isAmbientActive) return;
    
    if (ambientStopTimeout) {
      clearTimeout(ambientStopTimeout);
      ambientStopTimeout = null;
    }

    ambientOscs.forEach(osc => {
      try { osc.stop(); } catch (err) {}
    });
    ambientOscs = [];

    try {
      const ctx = getAudioContext();
      
      ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0, ctx.currentTime);
      ambientGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2.0);
      
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(180, ctx.currentTime);
      lowpass.Q.setValueAtTime(2.2, ctx.currentTime);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.08;
      lfoGain.gain.value = 45;

      lfo.connect(lfoGain);
      lfoGain.connect(lowpass.frequency);

      const oscs = [];

      const sub1 = ctx.createOscillator();
      sub1.type = 'sawtooth';
      sub1.frequency.value = 55;
      const sub2 = ctx.createOscillator();
      sub2.type = 'sawtooth';
      sub2.frequency.value = 55.4;

      const mid1 = ctx.createOscillator();
      mid1.type = 'sawtooth';
      mid1.frequency.value = 110;
      const mid2 = ctx.createOscillator();
      mid2.type = 'sawtooth';
      mid2.frequency.value = 110.8;

      const high1 = ctx.createOscillator();
      high1.type = 'triangle';
      high1.frequency.value = 220;

      [sub1, sub2, mid1, mid2, high1].forEach(osc => {
        osc.connect(lowpass);
        osc.start();
        oscs.push(osc);
      });

      lfo.start();
      oscs.push(lfo);

      lowpass.connect(ambientGain);
      ambientGain.connect(ctx.destination);

      ambientOscs = oscs;
      isAmbientActive = true;

      document.dispatchEvent(new CustomEvent('ambient-status-updated', { detail: { active: true } }));
    } catch (e) {}
  },

  stopAmbient() {
    if (!isAmbientActive) return;
    isAmbientActive = false;
    
    if (ambientStopTimeout) {
      clearTimeout(ambientStopTimeout);
      ambientStopTimeout = null;
    }

    try {
      const ctx = getAudioContext();
      
      if (ambientGain) {
        ambientGain.gain.cancelScheduledValues(ctx.currentTime);
        ambientGain.gain.setValueAtTime(ambientGain.gain.value, ctx.currentTime);
        ambientGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      }

      const oscsToStop = ambientOscs;
      ambientOscs = [];

      ambientStopTimeout = setTimeout(() => {
        oscsToStop.forEach(osc => {
          try { osc.stop(); } catch (err) {}
        });
        ambientStopTimeout = null;
      }, 1250);

      document.dispatchEvent(new CustomEvent('ambient-status-updated', { detail: { active: false } }));
    } catch (e) {}
  },

  toggleAmbient() {
    if (isAmbientActive) {
      this.stopAmbient();
      localStorage.setItem('techwear_ambient', 'false');
      isAmbientEnabled = false;
    } else {
      this.startAmbient();
      localStorage.setItem('techwear_ambient', 'true');
      isAmbientEnabled = true;
    }
    return isAmbientActive;
  }
};
