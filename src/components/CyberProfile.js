import { ProfileState } from '../modules/profile.js';
import { AudioService } from '../modules/audio.js';
import { Toast } from './Toast.js';
import '../styles/components/cyber-profile.css';

const FACTIONS = {
  NETRUNNER: {
    title: 'NETRUNNER // SEC-LEVEL 4',
    desc: 'Специалист по виртуальному взлому и обходу сетевых брандмауэров. Легко расшифровывает закрытые корпоративные узлы.',
    perk: 'Hacking decryption time -50%'
  },
  CYBORG: {
    title: 'CYBORG // AUG-LEVEL 8',
    desc: 'Высокотехнологичный боевой юнит с аугментациями суставов и когнитивных функций. Предпочитает тяжелую модульную броню.',
    perk: 'Armor module sync +20%'
  },
  RECON: {
    title: 'RECON AGENT // COLD-OPS',
    desc: 'Разведчик скрытого проникновения. Легкая бесшумная экипировка, маскировка в тепловом и визуальном спектрах.',
    perk: 'Stealth modules efficiency +30%'
  },
  OPERATIVE: {
    title: 'OPERATIVE // SHADOW SPEC',
    desc: 'Универсальный тактический специалист городского боя. Оптимизирован для координации всех MBS модулей.',
    perk: 'MBS modular load capacity +15%'
  }
};

export const CyberProfile = {
  terminalHistory: [
    '[SYS] Neural link established.',
    '[SYS] Welcome to DECRYPTOR terminal. Type "help" to start.'
  ],

  render() {
    const faction = ProfileState.getFaction();
    const credits = ProfileState.getCredits();
    const orders = ProfileState.getOrders();
    const level = ProfileState.getLevel();
    const xp = ProfileState.getXP();
    const xpNeeded = level * 100;
    const xpPercent = Math.min(100, Math.round((xp / xpNeeded) * 100));
    const currentFactionInfo = FACTIONS[faction] || FACTIONS.NETRUNNER;

    // Генерация истории заказов
    let ordersListHTML = '';
    if (orders.length === 0) {
      ordersListHTML = `
        <div class="profile-orders__empty">
          NO DISPATCH LOGS FOUND //
        </div>
      `;
    } else {
      ordersListHTML = orders.map(order => `
        <div class="profile-orders__item">
          <div>
            <div class="profile-orders__id">LOG #${order.id}</div>
            <div class="profile-orders__details">${order.date} // ${order.itemsCount} modules</div>
          </div>
          <div class="profile-orders__total">$${order.total}</div>
        </div>
      `).join('');
    }

    // Опции выбора фракции
    const factionButtonsHTML = Object.keys(FACTIONS).map(key => `
      <button 
        class="profile-faction__btn ${faction === key ? 'profile-faction__btn--active' : ''} js-faction-select" 
        data-faction="${key}"
      >
        ${key}
      </button>
    `).join('');

    return `
      <div class="profile-overlay" id="profile-overlay" aria-modal="true" role="dialog">
        <div class="profile-container" id="profile-container">
          
          <!-- Шапка -->
          <div class="profile-header">
            <span>NEURAL_LINK // CUSTOMER ID CARD</span>
            <div class="profile-window-controls">
              <span class="profile-dot"></span>
              <span class="profile-dot"></span>
              <span class="profile-dot profile-dot--fill" id="profile-close-btn" role="button" aria-label="Close profile window" tabindex="0" style="cursor: pointer;"></span>
            </div>
          </div>

          <!-- Контент -->
          <div class="profile-body">
            
            <!-- Левая колонка: ID Card -->
            <div class="profile-card-section">
              <div class="profile-card">
                <!-- Аватар (ASCII) -->
                <div class="profile-card__avatar-container">
                  <pre class="profile-card__avatar">
   .---.
  / _ _ \\
 | (o)(o) |
 \\   V   /
  |--|--|
  '-----'
                  </pre>
                  <div class="profile-card__avatar-overlay"></div>
                </div>

                <!-- Детали -->
                <div class="profile-card__details">
                  <div class="profile-card__label">CODENAME:</div>
                  <div class="profile-card__val">OPERATOR_LELYALER</div>
                  
                  <div class="profile-card__label">NEURAL LEVEL:</div>
                  <div class="profile-card__val profile-card__val--cyan">
                    LEVEL ${level} // <span style="font-size: 0.65rem; color: var(--color-text-secondary);">${xp} / ${xpNeeded} XP</span>
                  </div>

                  <!-- XP Progress Bar -->
                  <div class="profile-xp-bar" title="Neural Experience Progress">
                    <div class="profile-xp-bar__fill" style="width: ${xpPercent}%;"></div>
                  </div>

                  <div class="profile-card__label" style="margin-top: 10px;">NEURAL NETWORK LINK:</div>
                  <div class="profile-card__val profile-card__val--green">ONLINE (PWA ENABLED)</div>

                  <div class="profile-card__label" style="margin-top: 10px;">CYBER CREDITS:</div>
                  <div class="profile-card__credits">
                    <span class="profile-card__credits-symbol">₵</span>
                    <span id="profile-credits-value">${credits}</span>
                  </div>
                </div>
              </div>

              <!-- Фракция -->
              <div class="profile-faction">
                <h4 class="profile-section-title">CHOOSE SPECIALIZATION //</h4>
                <div class="profile-faction__grid">
                  ${factionButtonsHTML}
                </div>
                <div class="profile-faction__info" id="faction-desc-box">
                  <div class="profile-faction__title">${currentFactionInfo.title}</div>
                  <div class="profile-faction__desc">${currentFactionInfo.desc}</div>
                  <div class="profile-faction__perk">SYSTEM PERK: ${currentFactionInfo.perk}</div>
                </div>
              </div>
            </div>

            <!-- Правая колонка: Терминал взлома и Заказы -->
            <div class="profile-interact-section">
              <!-- Терминал -->
              <div class="hacker-terminal">
                <div class="hacker-terminal__header">SYSTEM DECRYPTOR PROMPT //</div>
                <div class="hacker-terminal__body" id="hacker-output">
                  ${this.terminalHistory.map(line => `<div>${line}</div>`).join('')}
                </div>
                <div class="hacker-terminal__input-row">
                  <span class="hacker-terminal__prompt">netrunner@techwear_net:~$</span>
                  <input 
                    type="text" 
                    class="hacker-terminal__input" 
                    id="hacker-input" 
                    placeholder="Type 'help'..." 
                    autocomplete="off"
                    aria-label="Terminal command input"
                  />
                </div>
              </div>

              <!-- Логи заказов -->
              <div class="profile-orders">
                <h4 class="profile-section-title">SECURE DISPATCH LOGS //</h4>
                <div class="profile-orders__list" id="profile-orders-list">
                  ${ordersListHTML}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  open() {
    const overlay = document.getElementById('profile-overlay');
    if (!overlay) return;

    // Перерисовываем контент перед открытием
    const appEl = document.querySelector('#app');
    const existingOverlay = document.getElementById('profile-overlay');
    if (existingOverlay) {
      existingOverlay.outerHTML = this.render();
    }

    const newOverlay = document.getElementById('profile-overlay');
    newOverlay.classList.add('profile-overlay--open');
    document.body.style.overflow = 'hidden';
    AudioService.playOpen();

    this.initListeners();

    // Скроллим терминал
    const output = document.getElementById('hacker-output');
    if (output) output.scrollTop = output.scrollHeight;
  },

  close() {
    const overlay = document.getElementById('profile-overlay');
    if (overlay) {
      overlay.classList.remove('profile-overlay--open');
      document.body.style.overflow = '';
      AudioService.playClick();
    }
  },

  printLine(text) {
    const output = document.getElementById('hacker-output');
    if (!output) return;

    this.terminalHistory.push(text);
    if (this.terminalHistory.length > 50) this.terminalHistory.shift();

    const line = document.createElement('div');
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  },

  handleCommand(cmdText) {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    this.printLine(`> ${trimmed}`);
    AudioService.playClick();

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const argument = parts[1] ? parts[1].toUpperCase() : null;

    if (command === 'help') {
      this.printLine('SUPPORTED PROTOCOLS:');
      this.printLine('  scan               - Scan network for vulnerable Corp Nodes.');
      this.printLine('  decrypt [node_id]  - Decrypt specific node to bypass price firewalls.');
      this.printLine('  inject             - Inject system exploit to gain ₵50 credits.');
      this.printLine('  clear              - Wipe terminal history.');
    } else if (command === 'scan') {
      this.printLine('[SYS] Scanning local sectors...');
      setTimeout(() => {
        this.printLine('FOUND VULNERABLE CORPNETS //');
        this.printLine('  NODE: CORP_SHIELD_V4 [FIREWALL: SECURE] [GEO: LOCAL]');
        this.printLine('  NODE: TACTICAL_NODE_9 [FIREWALL: NORMAL] [GEO: LOCAL]');
        this.printLine('Use "decrypt [node]" command to start security bypass.');
        AudioService.playSuccess();
      }, 500);
    } else if (command === 'decrypt') {
      if (!argument) {
        this.printLine('[ERR] SPECIFY TARGET NODE ID (e.g. "decrypt TACTICAL_NODE_9")');
        AudioService.playError();
        return;
      }

      if (argument === 'CORP_SHIELD_V4') {
        this.printLine('[SYS] TARGET: CORP_SHIELD_V4 // STARTING BYPASS...');
        this.runDecryptionSequence('NEOHACK20', 20);
      } else if (argument === 'TACTICAL_NODE_9') {
        this.printLine('[SYS] TARGET: TACTICAL_NODE_9 // STARTING BYPASS...');
        this.runDecryptionSequence('TACTICAL15', 15);
      } else {
        this.printLine(`[ERR] TARGET "${argument}" NOT FOUND IN LOCAL SCAN.`);
        AudioService.playError();
      }
    } else if (command === 'inject') {
      this.printLine('[SYS] Running kernel exploit...');
      setTimeout(() => {
        ProfileState.addCredits(50);
        ProfileState.addXP(15);
        this.printLine('[SYS] EXPLOIT CONFIRMED. +₵50 Cyber Credits added.');
        Toast.show('₵50 INJECTED // EXPLOIT CONFIRMED', 'SECURITY BYPASS //', 'pink');
        AudioService.playSuccess();
        
        // Обновляем баланс в UI
        const creditsEl = document.getElementById('profile-credits-value');
        if (creditsEl) creditsEl.textContent = ProfileState.getCredits();
      }, 600);
    } else if (command === 'clear') {
      this.terminalHistory = [];
      const output = document.getElementById('hacker-output');
      if (output) output.innerHTML = '';
    } else {
      this.printLine(`[ERR] COMMAND "${command.toUpperCase()}" REJECTED BY HOST.`);
      AudioService.playError();
    }
  },

  runDecryptionSequence(code, percent) {
    const input = document.getElementById('hacker-input');
    if (input) input.disabled = true;

    const steps = [
      '  Connecting... [OK]',
      '  Bypassing TLS handshake... [OK]',
      '  Injecting Buffer Overflow payload... [OK]',
      '  Extracting cypher key... 30%',
      '  Extracting cypher key... 70%',
      '  Extracting cypher key... 100% [SUCCESS]',
      `  DECRYPTED ACCESS CODE: [${code}]`
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        this.printLine(steps[i]);
        AudioService.playClick();
        i++;
      } else {
        clearInterval(interval);
        ProfileState.addDecryptedCode(code);
        ProfileState.addXP(30);
        this.printLine(`[SYS] Promo code [${code}] is now unlocked in checkout! (-${percent}%)`);
        Toast.show(`UNLOCKED PROMO CODE: ${code}`, 'DECRYPTION COMPLETE //', 'green');
        AudioService.playSuccess();
        if (input) {
          input.disabled = false;
          input.focus();
        }
      }
    }, 400);
  },

  initListeners() {
    const overlay = document.getElementById('profile-overlay');
    const closeBtn = document.getElementById('profile-close-btn');
    const inputField = document.getElementById('hacker-input');
    const factionSelectButtons = document.querySelectorAll('.js-faction-select');

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (inputField) {
      inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const val = inputField.value;
          inputField.value = '';
          this.handleCommand(val);
        }
      });
    }

    // Слушатели смены фракции
    factionSelectButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const faction = e.target.dataset.faction;
        ProfileState.setFaction(faction);
        ProfileState.addXP(10);
        AudioService.playClick();
        
        // Обновляем активную кнопку
        factionSelectButtons.forEach(b => b.classList.remove('profile-faction__btn--active'));
        e.target.classList.add('profile-faction__btn--active');

        // Обновляем описание фракции
        const info = FACTIONS[faction];
        const descBox = document.getElementById('faction-desc-box');
        if (descBox && info) {
          descBox.innerHTML = `
            <div class="profile-faction__title">${info.title}</div>
            <div class="profile-faction__desc">${info.desc}</div>
            <div class="profile-faction__perk">SYSTEM PERK: ${info.perk}</div>
          `;
        }
        
        Toast.show(`SPECIALIZATION ALIGNED: [${faction}]`, 'NEURAL UPDATE //', 'blue');
      });
    });
  }
};
