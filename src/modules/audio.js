/**
 * Модуль синтеза звуков на чистом Web Audio API (Audio Feedback)
 * Синтезирует футуристичные звуковые эффекты на лету, не требуя аудиофайлов.
 */

let audioCtx = null;
let isEnabled = localStorage.getItem('techwear_sound') !== 'false';
let isAmbientEnabled = localStorage.getItem('techwear_ambient') !== 'false';
let ambientOscs = [];
let ambientGain = null;
let isAmbientActive = false;
let ambientStopTimeout = null;

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
    return localStorage.getItem('techwear_sound') !== 'false';
  },

  /**
   * Переключить состояние звука
   * @returns {boolean} новое состояние
   */
  toggle() {
    const currentState = localStorage.getItem('techwear_sound') !== 'false';
    const nextState = !currentState;
    localStorage.setItem('techwear_sound', nextState ? 'true' : 'false');
    console.log(`🔊 [Audio] Sound effects active: ${nextState}`);
    return nextState;
  },

  /**
   * Короткий механический клик (щелчок кнопки)
   */
  playClick() {
    if (localStorage.getItem('techwear_sound') === 'false') return;
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
    if (localStorage.getItem('techwear_sound') === 'false') return;
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
    if (localStorage.getItem('techwear_sound') === 'false') return;
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
    if (localStorage.getItem('techwear_sound') === 'false') return;
    try {
      const { osc, ctx } = createOscillator('triangle', 320, 0.25, 0.1);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.warn('⚠️ [Audio] Open sound synthesis failed:', e);
    }
  },

  /**
   * Проверить, запущен ли фоновый гул (эмбиент)
   */
  isAmbientActive() {
    return isAmbientActive;
  },

  /**
   * Запуск генерации бесконечного киберпанк-эмбиента
   */
  startAmbient() {
    if (isAmbientActive) return;
    
    // Очищаем таймаут остановки, если пользователь быстро переключил обратно
    if (ambientStopTimeout) {
      clearTimeout(ambientStopTimeout);
      ambientStopTimeout = null;
    }

    // Принудительно останавливаем все старые осцилляторы, если они зависли
    ambientOscs.forEach(osc => {
      try { osc.stop(); } catch (err) {}
    });
    ambientOscs = [];

    try {
      const ctx = getAudioContext();
      
      // Общая громкость эмбиента (подняли до 0.12 для разборчивости)
      ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0, ctx.currentTime);
      // Мягкий фейд-ин
      ambientGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2.0);
      
      // Фильтр низких частот (Lowpass Filter) с поднятым срезом до 220Гц
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(180, ctx.currentTime);
      lowpass.Q.setValueAtTime(2.2, ctx.currentTime); // Свечение на частоте среза

      // Настройка LFO модуляции фильтра (эффект пульсирующей энергии)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.08; // 1 цикл за 12 секунд
      lfoGain.gain.value = 45; // колебания +-45Гц

      lfo.connect(lfoGain);
      lfoGain.connect(lowpass.frequency);

      // Генерируем 3 слоя частот для читаемости на любых динамиках (ноутбуках/телефонах)
      const oscs = [];

      // 1. Суб-бас (55 Гц и 55.4 Гц) - чувствуется в наушниках
      const sub1 = ctx.createOscillator();
      sub1.type = 'sawtooth';
      sub1.frequency.value = 55;
      const sub2 = ctx.createOscillator();
      sub2.type = 'sawtooth';
      sub2.frequency.value = 55.4;

      // 2. Средний бас (110 Гц и 110.8 Гц) - слышен на большинстве акустических систем
      const mid1 = ctx.createOscillator();
      mid1.type = 'sawtooth';
      mid1.frequency.value = 110;
      const mid2 = ctx.createOscillator();
      mid2.type = 'sawtooth';
      mid2.frequency.value = 110.8;

      // 3. Теплый тон (220 Гц) - отлично воспроизводится пищалками ноутбуков
      const high1 = ctx.createOscillator();
      high1.type = 'triangle';
      high1.frequency.value = 220;

      // Соединяем осцилляторы с фильтром
      [sub1, sub2, mid1, mid2, high1].forEach(osc => {
        osc.connect(lowpass);
        osc.start();
        oscs.push(osc);
      });

      // Запускаем LFO
      lfo.start();
      oscs.push(lfo);

      lowpass.connect(ambientGain);
      ambientGain.connect(ctx.destination);

      ambientOscs = oscs;
      isAmbientActive = true;

      // Оповещаем систему о старте гула
      document.dispatchEvent(new CustomEvent('ambient-status-updated', { detail: { active: true } }));
    } catch (e) {
      console.warn('⚠️ [Audio] Ambient hum synthesis failed:', e);
    }
  },

  /**
   * Остановка генерации эмбиента с плавным затуханием
   */
  stopAmbient() {
    if (!isAmbientActive) return;
    isAmbientActive = false; // Сбрасываем флаг активности немедленно
    
    if (ambientStopTimeout) {
      clearTimeout(ambientStopTimeout);
      ambientStopTimeout = null;
    }

    try {
      const ctx = getAudioContext();
      
      if (ambientGain) {
        ambientGain.gain.cancelScheduledValues(ctx.currentTime);
        ambientGain.gain.setValueAtTime(ambientGain.gain.value, ctx.currentTime);
        // Плавный фейд-аут
        ambientGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      }

      // Сохраняем ссылки на удаляемые осцилляторы локально, чтобы очистить массив прямо сейчас
      const oscsToStop = ambientOscs;
      ambientOscs = [];

      ambientStopTimeout = setTimeout(() => {
        oscsToStop.forEach(osc => {
          try { osc.stop(); } catch (err) {}
        });
        ambientStopTimeout = null;
      }, 1250);

      // Оповещаем систему об остановке гула
      document.dispatchEvent(new CustomEvent('ambient-status-updated', { detail: { active: false } }));
    } catch (e) {
      console.warn('⚠️ [Audio] Ambient stopping failed:', e);
    }
  },

  /**
   * Переключить воспроизведение эмбиента
   */
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


