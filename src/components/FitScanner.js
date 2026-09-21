import { AudioService } from '../modules/audio.js';
import { Toast } from './Toast.js';

export const FitScanner = {
  activeProductId: null,
  activeCategory: 'apparel',
  scanTimeout: null,
  logInterval: null,

  render() {
    return `
      <div class="fit-scanner-overlay" id="fit-scanner-overlay" aria-modal="true" role="dialog">
        <div class="fit-scanner-modal">
          
          <div class="fit-scanner__header">
            <div class="fit-scanner__title-group">
              <span class="fit-scanner__title">FIT SCANNER // v2.9</span>
              <span class="fit-scanner__subtitle" id="fit-scanner-target">TARGET: APPAREL CONTOUR</span>
            </div>
            <button class="fit-scanner__close" id="fit-scanner-close-btn" aria-label="Закрыть сканер">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="fit-scanner__body">
            
            <div class="fit-scanner__step fit-scanner__step--active" id="fit-scanner-step-input">
              <div class="js-scanner-inputs" data-type="apparel" style="display: flex; flex-direction: column; gap: var(--space-md);">
                <div class="fit-scanner__field">
                  <div class="fit-scanner__label-row">
                    <span>HEIGHT (cm) //</span>
                    <span class="fit-scanner__val" id="height-val">178</span>
                  </div>
                  <input type="range" class="fit-scanner__slider" id="height-slider" min="150" max="210" value="178" aria-label="Height in centimeters" />
                </div>
                <div class="fit-scanner__field">
                  <div class="fit-scanner__label-row">
                    <span>WEIGHT (kg) //</span>
                    <span class="fit-scanner__val" id="weight-val">75</span>
                  </div>
                  <input type="range" class="fit-scanner__slider" id="weight-slider" min="40" max="130" value="75" aria-label="Weight in kilograms" />
                </div>
              </div>

              <div class="js-scanner-inputs" data-type="sneakers" style="display: none; flex-direction: column; gap: var(--space-md);">
                <div class="fit-scanner__field">
                  <div class="fit-scanner__label-row">
                    <span>FOOT LENGTH (mm) //</span>
                    <span class="fit-scanner__val" id="foot-val">270</span>
                  </div>
                  <input type="range" class="fit-scanner__slider" id="foot-slider" min="230" max="310" value="270" aria-label="Foot length in millimeters" />
                </div>
              </div>

              <div class="js-scanner-inputs" data-type="gloves" style="display: none; flex-direction: column; gap: var(--space-md);">
                <div class="fit-scanner__field">
                  <div class="fit-scanner__label-row">
                    <span>PALM WIDTH (cm) //</span>
                    <span class="fit-scanner__val" id="palm-val">8.5</span>
                  </div>
                  <input type="range" class="fit-scanner__slider" id="palm-slider" min="6.5" max="11.5" step="0.5" value="8.5" aria-label="Palm width in centimeters" />
                </div>
              </div>

              <div class="js-scanner-inputs" data-type="onesize" style="display: none; text-align: center; color: var(--color-text-secondary); padding: var(--space-md) 0;">
                <p style="font-size: 0.8rem; line-height: 1.5;">
                  THIS MODULE HAS AN ADJUSTABLE FIT SYSTEM.<br>
                  <span style="color: var(--color-accent-blue);">ONE SIZE FITS ALL PROFILE //</span>
                </p>
              </div>

              <div class="fit-scanner__footer">
                <button class="fit-scanner__btn fit-scanner__btn--primary js-interactive" id="fit-scanner-start-btn">
                  INITIATE SCAN //
                </button>
              </div>
            </div>

            <div class="fit-scanner__step" id="fit-scanner-step-process">
              <div class="fit-scanner__scanning-box">
                <div class="fit-scanner__hologram"></div>
                <div class="fit-scanner__laser"></div>
                
                <svg class="fit-scanner__silhouette" viewBox="0 0 100 100">
                  <path d="M50,15 C54,15 54,23 50,23 C46,23 46,15 50,15 Z M42,25 C45,24 55,24 58,25 C64,26 64,45 61,45 C59,45 59,33 58,33 L57,55 L58,85 L54,85 L51,60 L49,60 L46,85 L42,85 L43,55 L42,33 C41,33 41,45 39,45 C36,45 36,26 42,25 Z"></path>
                </svg>
              </div>
              <div class="fit-scanner__logs" id="fit-scanner-log-console"></div>
            </div>

            <div class="fit-scanner__step" id="fit-scanner-step-results">
              <div class="fit-scanner__results-box">
                <span class="fit-scanner__result-title" id="fit-product-title">COMPATIBLE SIZE</span>
                <span class="fit-scanner__result-size" id="fit-result-size">M</span>
                <span class="fit-scanner__accuracy" id="fit-accuracy">MATCH INDEX: 98.4%</span>
                <p class="fit-scanner__desc" id="fit-result-desc">
                  Modular shell fits optimally. Sufficient clearance preserved for active movements and module harness layouts.
                </p>
              </div>
              <div class="fit-scanner__footer">
                <button class="fit-scanner__btn fit-scanner__btn--primary js-interactive" id="fit-scanner-save-btn">
                  APPLY FIT TO PROFILE //
                </button>
                <button class="fit-scanner__btn fit-scanner__btn--secondary js-interactive" id="fit-scanner-recal-btn">
                  RE-CALIBRATE //
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  },

  detectCategory(productId) {
    const id = productId.toLowerCase();
    if (id.includes('sneakers') || id.includes('boots')) return 'sneakers';
    if (id.includes('gloves')) return 'gloves';
    if (id.includes('backpack') || id.includes('visor') || id.includes('mask') || id.includes('sling')) return 'onesize';
    return 'apparel';
  },

  open(productId, productName) {
    this.activeProductId = productId;
    this.activeCategory = this.detectCategory(productId);
    
    const overlay = document.getElementById('fit-scanner-overlay');
    const targetLabel = document.getElementById('fit-scanner-target');
    
    if (targetLabel) {
      targetLabel.textContent = `TARGET: ${productName.toUpperCase()}`;
    }

    this.showStep('input');

    document.querySelectorAll('.js-scanner-inputs').forEach(el => {
      if (el.dataset.type === this.activeCategory) {
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    });

    if (overlay) {
      overlay.classList.add('fit-scanner-overlay--open');
      document.body.style.overflow = 'hidden';
      AudioService.playOpen();
    }
  },

  close() {
    const overlay = document.getElementById('fit-scanner-overlay');
    if (overlay) {
      overlay.classList.remove('fit-scanner-overlay--open');
      document.body.style.overflow = '';
      AudioService.playClick();
    }
    
    clearTimeout(this.scanTimeout);
    clearInterval(this.logInterval);
  },

  showStep(stepName) {
    const steps = {
      input: document.getElementById('fit-scanner-step-input'),
      process: document.getElementById('fit-scanner-step-process'),
      results: document.getElementById('fit-scanner-step-results')
    };

    Object.keys(steps).forEach(key => {
      if (steps[key]) {
        if (key === stepName) {
          steps[key].classList.add('fit-scanner__step--active');
        } else {
          steps[key].classList.remove('fit-scanner__step--active');
        }
      }
    });
  },

  initListeners() {
    const overlay = document.getElementById('fit-scanner-overlay');
    const closeBtn = document.getElementById('fit-scanner-close-btn');
    const startBtn = document.getElementById('fit-scanner-start-btn');
    const saveBtn = document.getElementById('fit-scanner-save-btn');
    const recalBtn = document.getElementById('fit-scanner-recal-btn');

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    const sliders = [
      { id: 'height', unit: ' cm' },
      { id: 'weight', unit: ' kg' },
      { id: 'foot', unit: ' mm' },
      { id: 'palm', unit: ' cm' }
    ];

    sliders.forEach(s => {
      const slider = document.getElementById(`${s.id}-slider`);
      const valDisplay = document.getElementById(`${s.id}-val`);
      if (slider && valDisplay) {
        slider.addEventListener('input', (e) => {
          valDisplay.textContent = e.target.value + s.unit;
        });
      }
    });

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.runScanning();
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const sizeResult = document.getElementById('fit-result-size').textContent;
        localStorage.setItem(`fit_size_${this.activeProductId}`, sizeResult);
        
        document.dispatchEvent(new CustomEvent('fit-profile-updated', {
          detail: { productId: this.activeProductId, size: sizeResult }
        }));
        
        Toast.show(
          `SIZE [${sizeResult}] SAVED TO TACTICAL PROFILE //`, 
          'BIOMETRICS REGISTERED //', 
          'green'
        );
        this.close();
      });
    }

    if (recalBtn) {
      recalBtn.addEventListener('click', () => {
        this.showStep('input');
        AudioService.playClick();
      });
    }
  },

  runScanning() {
    this.showStep('process');
    AudioService.playOpen();

    const consoleLog = document.getElementById('fit-scanner-log-console');
    if (consoleLog) consoleLog.innerHTML = '';

    const logLines = [
      '// CONNECTING TO BIOMETRIC SENSORS...',
      '// CALIBRATING SCANNING ARRAYS [OK]',
      '// MEASURING CONTOUR CONTRAST...',
      '// ANALYZING ANATOMICAL VOLUME...',
      '// QUERYING SIZE DATABASE SPECIFICATIONS...',
      '// COMPILING OPTIMAL COMPATIBILITY VECTOR...'
    ];

    let currentLogIndex = 0;
    
    this.logInterval = setInterval(() => {
      if (currentLogIndex < logLines.length) {
        const logLine = document.createElement('div');
        logLine.className = 'fit-scanner__log-line';
        logLine.textContent = logLines[currentLogIndex];
        consoleLog.appendChild(logLine);
        consoleLog.scrollTop = consoleLog.scrollHeight;
        
        AudioService.playClick();
        currentLogIndex++;
      }
    }, 300);

    this.scanTimeout = setTimeout(() => {
      clearInterval(this.logInterval);
      this.calculateAndShowResult();
    }, 2100);
  },

  calculateAndShowResult() {
    let size = 'M';
    let matchIdx = 95.0 + Math.random() * 4.9;
    let desc = '';

    if (this.activeCategory === 'onesize') {
      size = 'O/S';
      desc = 'Adjustable harness contour. 100% hardware match. Straps support compression settings from XS to XXL.';
    } else if (this.activeCategory === 'gloves') {
      const palmVal = parseFloat(document.getElementById('palm-slider').value);
      if (palmVal < 8.0) {
        size = 'S';
        desc = 'Fitted skin profile. Carbon fiber protectors align optimally with metacarpal joints.';
      } else if (palmVal <= 9.0) {
        size = 'M';
        desc = 'Optimal ergonomic compression. Perfect glove-to-grip surface tactile feedback.';
      } else if (palmVal <= 10.0) {
        size = 'L';
        desc = 'Relaxed fit profile. Preserves knuckle mobility and thermal modular layer expansion.';
      } else {
        size = 'XL';
        desc = 'Extended fit profile for heavy anatomical structure. Hook-and-loop straps require tight lock.';
      }
    } else if (this.activeCategory === 'sneakers') {
      const footVal = parseInt(document.getElementById('foot-slider').value);
      if (footVal < 245) size = '39';
      else if (footVal < 252) size = '40';
      else if (footVal < 260) size = '41';
      else if (footVal < 268) size = '42';
      else if (footVal < 275) size = '43';
      else if (footVal < 282) size = '44';
      else if (footVal < 290) size = '45';
      else size = '46';
      
      desc = 'Sole cushion matches foot geometry. Glow-sole pressure zones optimized for maximum energy recoil.';
    } else {
      const height = parseInt(document.getElementById('height-slider').value);
      const weight = parseInt(document.getElementById('weight-slider').value);

      if (height < 170) {
        if (weight < 65) {
          size = 'S';
          desc = 'Tight tactical profile. Core modular mounts aligned directly to chest frame.';
        } else if (weight < 80) {
          size = 'M';
          desc = 'Standard urban utility fit. Accommodates direct tactical rig underlay.';
        } else {
          size = 'L';
          desc = 'Slightly relaxed sleeves. Recommended for heavy modular gear layout.';
        }
      } else if (height < 185) {
        if (weight < 70) {
          size = 'M';
          desc = 'Slim aerodynamic silhouette. Minimal drag coefficient for active speed modules.';
        } else if (weight < 90) {
          size = 'L';
          desc = 'Standard size match. Optimal sleeve length and jacket bottom hem coverage.';
        } else {
          size = 'XL';
          desc = 'Slightly loose silhouette. Fully supports modular attachments without load shifting.';
        }
      } else {
        if (weight < 80) {
          size = 'L';
          desc = 'Tall slim profile. Core torso dimensions verified. Length parameters matched.';
        } else if (weight < 100) {
          size = 'XL';
          desc = 'Standard massive fit. Shoulder seams positioned for zero restriction in modular carry.';
        } else {
          size = 'XXL';
          desc = 'Heavy shell silhouette. Preserves absolute room for thermal and kinetic under-armor.';
        }
      }
    }

    document.getElementById('fit-result-size').textContent = size;
    document.getElementById('fit-accuracy').textContent = `MATCH INDEX: ${matchIdx.toFixed(1)}%`;
    document.getElementById('fit-result-desc').textContent = desc;

    this.showStep('results');
    AudioService.playSuccess();
  }
};
