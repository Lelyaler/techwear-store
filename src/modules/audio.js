/**
 * Модуль синтеза звуков на чистом Web Audio API (Audio Feedback)
 * Синтезирует футуристичные звуковые эффекты на лету, не требуя аудиофайлов.
 */

let audioCtx = null;
let isEnabled = localStorage.getItem('techwear_sound') === 'true';

/**
 * Ленивая инициализация AudioContext
 */
const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  // Возобновляем контекст, если он был заблокирован браузером
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  return audioCtx;
};

/**
 * Вспомогательный метод генерации звуковой волны
 */
const createOscillator = (type, freq, duration, gainStart, gainEnd = 0.001) => {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = type; // 'sine', 'triangle', 'sawtooth', 'square'
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  
  gainNode.gain.setValueAtTime(gainStart, ctx.currentTime);
  // Экспоненциальный спад громкости для естественного затухания
  gainNode.gain.exponentialRampToValueAtTime(gainEnd, ctx.currentTime + duration);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  return { osc, gainNode, ctx };
};

export const AudioService = {
  /**
   * Проверить, активен ли звук в системе
   * @returns {boolean}
   */
  isEnabled() {
    return isEnabled;
  },

  /**
   * Переключить состояние звука
   * @returns {boolean} новое состояние
   */
  toggle() {
    isEnabled = !isEnabled;
    localStorage.setItem('techwear_sound', isEnabled);
    console.log(`🔊 [Audio] Sound effects active: ${isEnabled}`);
    return isEnabled;
  },

  /**
   * Короткий механический клик (щелчок кнопки)
   */
  playClick() {
    if (!isEnabled) return;
    try {
      const { osc, ctx } = createOscillator('sine', 1200, 0.05, 0.08);
      // Быстрое понижение частоты создает эффект механического клика
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn('⚠️ [Audio] Click synthesis failed:', e);
    }
  },

  /**
   * Восходящее арпеджио (успешная покупка / добавление товара)
   */
  playSuccess() {
    if (!isEnabled) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      
      const playNote = (freq, startOffset, duration) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'triangle'; // Более мягкая волна
        osc.frequency.setValueAtTime(freq, now + startOffset);
        
        gainNode.gain.setValueAtTime(0, now + startOffset);
        gainNode.gain.linearRampToValueAtTime(0.12, now + startOffset + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + startOffset + duration);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(now + startOffset);
        osc.stop(now + startOffset + duration);
      };

      // Играем C5 ноту, затем G5 с легким сдвигом для создания футуристичного аккорда
      playNote(523.25, 0, 0.15);
      playNote(783.99, 0.07, 0.25);
    } catch (e) {
      console.warn('⚠️ [Audio] Success synthesis failed:', e);
    }
  },

  /**
   * Низкий пилообразный гудок (ошибка поиска)
   */
  playError() {
    if (!isEnabled) return;
    try {
      const { osc, ctx } = createOscillator('sawtooth', 130, 0.25, 0.05);
      osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.warn('⚠️ [Audio] Error synthesis failed:', e);
    }
  },

  /**
   * Восходящий плавный свист (открытие корзины)
   */
  playOpen() {
    if (!isEnabled) return;
    try {
      const { osc, ctx } = createOscillator('triangle', 320, 0.25, 0.1);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.warn('⚠️ [Audio] Open sound synthesis failed:', e);
    }
  }
};
