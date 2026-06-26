import { CartState } from '../modules/cart.js';
import { AudioService } from '../modules/audio.js';
import { Toast } from './Toast.js';

/**
 * UI Компонент: CheckoutTerminal (Консольное оформление заказа)
 * Предоставляет интерактивный ретро-футуристический CLI терминал для оформления покупок.
 */
export const CheckoutTerminal = {
  currentStep: 0, // 0: Address, 1: Phone, 2: Email, 3: Confirmation, 4: Finished
  userData: {
    address: '',
    phone: '',
    email: ''
  },
  
  /**
   * Генерация HTML-разметки модального окна терминала
   * @returns {string} HTML string
   */
  render() {
    return `
      <div class="checkout-terminal-overlay" id="checkout-terminal-overlay" aria-modal="true" role="dialog">
        <div class="checkout-terminal" id="terminal-container">
          
          <!-- Шапка терминала -->
          <div class="checkout-terminal__header">
            <span>SECURE_COMM_TERMINAL // PORT: 922</span>
            <div class="checkout-terminal__window-controls">
              <span class="checkout-terminal__dot"></span>
              <span class="checkout-terminal__dot"></span>
              <span class="checkout-terminal__dot checkout-terminal__dot--fill" id="terminal-close-btn" style="cursor: pointer;"></span>
            </div>
          </div>

          <!-- Тело логов консоли -->
          <div class="checkout-terminal__body" id="terminal-output">
            <!-- Здесь генерируются логи -->
          </div>

          <!-- Интерактивная строка ввода -->
          <div class="checkout-terminal__input-line" id="terminal-input-row">
            <span class="checkout-terminal__prompt" id="terminal-prompt-prefix">operator@techwear_os:~$</span>
            <input 
              type="text" 
              class="checkout-terminal__input" 
              id="terminal-input" 
              placeholder="Type command or input..." 
              autocomplete="off"
              aria-label="Ввод команд терминала"
            />
            <span class="terminal-cursor"></span>
          </div>

        </div>
      </div>
    `;
  },

  /**
   * Открыть терминал и инициализировать сессию
   */
  open() {
    const overlay = document.getElementById('checkout-terminal-overlay');
    const inputField = document.getElementById('terminal-input');
    
    if (!overlay) return;

    overlay.classList.add('checkout-terminal-overlay--open');
    document.body.style.overflow = 'hidden';
    AudioService.playOpen();

    this.currentStep = 0;
    this.userData = { address: '', phone: '', email: '' };

    // Фокусируем терминал
    if (inputField) {
      setTimeout(() => inputField.focus(), 150);
    }

    this.printWelcomeSequence();
  },

  /**
   * Закрыть терминал
   */
  close() {
    const overlay = document.getElementById('checkout-terminal-overlay');
    if (overlay) {
      overlay.classList.remove('checkout-terminal-overlay--open');
      document.body.style.overflow = '';
      AudioService.playClick();
    }
  },

  /**
   * Напечатать приветствие, список товаров и первый вопрос
   */
  printWelcomeSequence() {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    output.innerHTML = '';
    
    const items = CartState.getItems();
    const total = CartState.getTotalPrice();

    this.printLine('***************************************************', 'system');
    this.printLine('*         TACTICAL GEAR DISPATCH PROTOCOL v4.2     *', 'system');
    this.printLine('*          SECURE QUANTUM ENCRYPTED CHANNEL       *', 'system');
    this.printLine('***************************************************', 'system');
    this.printLine('[SYS] Link status: SECURE // PORT: 922 ESTABLISHED');
    this.printLine('[SYS] Loading telemetry modules...');
    
    // Печать товаров в терминальном стиле
    this.printLine('\nSTAGING LOAD SHEET //');
    
    let itemsGrid = `<div class="terminal-grid">`;
    items.forEach(item => {
      const lineName = item.name.toUpperCase().padEnd(35, '.');
      const lineCost = `$${item.price * item.quantity}`.padStart(8, '.');
      itemsGrid += `
        <div class="terminal-grid-row">
          <span>x${item.quantity} ${lineName}</span>
          <span>${lineCost}</span>
        </div>
      `;
    });
    
    // Доставка
    const shipName = 'TACTICAL UAV DELIVERY'.padEnd(35, '.');
    itemsGrid += `
      <div class="terminal-grid-row">
        <span>${shipName}</span>
        <span>$15.....</span>
      </div>
    `;
    
    // Итого
    const totalName = 'GRAND TOTAL'.padEnd(35, '.');
    itemsGrid += `
      <div class="terminal-grid-row" style="font-weight: bold; border-top: 1px dashed currentColor; margin-top: 4px; padding-top: 4px;">
        <span>${totalName}</span>
        <span>$${total + 15}.....</span>
      </div>
    `;
    itemsGrid += '</div>';

    // Вставляем сетку
    const gridContainer = document.createElement('div');
    gridContainer.innerHTML = itemsGrid;
    output.appendChild(gridContainer);

    this.printLine('[SYS] Staging complete. Ready to record telemetry.');
    this.printLine('\n[SYS] STEP 1: ENTER SHIELDED DELIVERY SECTOR (City, Street, Apt) //');
    
    this.updatePrompt('delivery_sector:~$');
    
    output.scrollTop = output.scrollHeight;
  },

  /**
   * Добавить текстовую строку в консоль
   */
  printLine(text, type = 'default') {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    const line = document.createElement('div');
    line.className = `terminal-line terminal-line--${type}`;
    line.textContent = text;
    output.appendChild(line);
    
    output.scrollTop = output.scrollHeight;
  },

  /**
   * Изменить префикс подсказки (prompt)
   */
  updatePrompt(prefix) {
    const promptEl = document.getElementById('terminal-prompt-prefix');
    if (promptEl) {
      promptEl.textContent = prefix;
    }
  },

  /**
   * Реакция на ввод команды пользователем
   */
  handleInput(inputVal) {
    const trimmedVal = inputVal.trim();
    if (!trimmedVal) return;

    // Сначала печатаем команду пользователя
    this.printLine(`> ${trimmedVal}`, 'user');
    AudioService.playClick();

    // Быстрый выход по команде 'exit'
    if (trimmedVal.toLowerCase() === 'exit' || trimmedVal.toLowerCase() === '/exit') {
      this.printLine('[SYS] Aborting connection. Closing terminal...');
      setTimeout(() => this.close(), 500);
      return;
    }

    switch (this.currentStep) {
      case 0: // Ввод адреса
        if (trimmedVal.length < 5) {
          this.printLine('[ERR] Sector coordinates invalid. Must be at least 5 characters.', 'error');
          AudioService.playError();
        } else {
          this.userData.address = trimmedVal;
          this.printLine(`[SYS] Sector recorded: "${this.userData.address.toUpperCase()}" [OK]`);
          this.printLine('\n[SYS] STEP 2: ENTER COMMUNICATOR NODE NUMBER (Phone / Comms Link) //');
          this.updatePrompt('comm_node:~$');
          this.currentStep = 1;
        }
        break;

      case 1: // Ввод телефона
        const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
        if (trimmedVal.length < 7 || !phoneRegex.test(trimmedVal)) {
          this.printLine('[ERR] Connection frequency invalid. Input correct numerical node address (phone).', 'error');
          AudioService.playError();
        } else {
          this.userData.phone = trimmedVal;
          this.printLine(`[SYS] Comms node synchronized: "${this.userData.phone}" [OK]`);
          this.printLine('\n[SYS] STEP 3: ENTER ACCESS ID CODE (Email) //');
          this.updatePrompt('access_signature:~$');
          this.currentStep = 2;
        }
        break;

      case 2: // Ввод email
        if (trimmedVal.length < 5 || !trimmedVal.includes('@') || !trimmedVal.includes('.')) {
          this.printLine('[ERR] Authentication pattern rejected. Enter valid email signature.', 'error');
          AudioService.playError();
        } else {
          this.userData.email = trimmedVal;
          this.printLine(`[SYS] Access key matching: "${this.userData.email.toUpperCase()}" [OK]`);
          this.printLine('\n===================================================');
          this.printLine('TRANSMISSION PREVIEW //');
          this.printLine(`SECTOR: ${this.userData.address.toUpperCase()}`);
          this.printLine(`COMM NODE: ${this.userData.phone}`);
          this.printLine(`ACCESS SIGNATURE: ${this.userData.email.toUpperCase()}`);
          this.printLine('===================================================');
          this.printLine('\n[SYS] ENTER "CONFIRM" TO DISPATCH TACTICAL DELIVERY DRONES //');
          this.updatePrompt('confirm_transmit(CONFIRM/exit):~$');
          this.currentStep = 3;
        }
        break;

      case 3: // Подтверждение заказа
        if (trimmedVal.toUpperCase() === 'CONFIRM' || trimmedVal.toUpperCase() === 'Y' || trimmedVal.toUpperCase() === 'YES') {
          this.currentStep = 4;
          this.runDispatchSequence();
        } else {
          this.printLine('[SYS] Input not recognized. Enter "CONFIRM" to dispatch or "exit" to abort.');
          AudioService.playError();
        }
        break;

      default:
        this.printLine('[SYS] Command array locked. Cargo already dispatched.');
        break;
    }
  },

  /**
   * Анимация отправки заказа дроном
   */
  runDispatchSequence() {
    const inputRow = document.getElementById('terminal-input-row');
    if (inputRow) inputRow.style.display = 'none'; // Скрываем поле ввода

    this.printLine('\n[SYS] BOOTING UAV AUTONOMOUS NAVIGATOR...');
    AudioService.playOpen();

    const sequence = [
      '// WARMING UP DISPATCH ROTORS [OK]',
      '// CALCULATING WIND SHEAR DEVIATION [OK]',
      '// PACKING MODULAR SECURE COMPRESSION BAGS [OK]',
      '// COMMENCING DATA TRANSMISSION TO DRONE DOCK...',
      '// DRONE #UAV-289 DISPATCHED FOR SECTOR: ' + this.userData.address.toUpperCase() + ' //',
      '// SUCCESS // SHIPMENT TRANSMITTED.'
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < sequence.length) {
        this.printLine(sequence[index]);
        AudioService.playClick();
        index++;
      } else {
        clearInterval(interval);
        this.finalizeOrder();
      }
    }, 450);
  },

  /**
   * Завершение оформления, очистка корзины и показ Toast
   */
  finalizeOrder() {
    // Генерируем случайный номер заказа
    const orderId = 'TX-' + Math.floor(100000 + Math.random() * 900000);
    
    this.printLine(`\n***************************************************`);
    this.printLine(`*          ORDER SUCCESSFULLY DEPLOYED            *`);
    this.printLine(`*          SECURE ID KEY: #${orderId}          *`);
    this.printLine(`***************************************************`);
    this.printLine(`\n[SYS] Closing link. Stay tactical.`);

    // Звуковой эффект успеха
    AudioService.playSuccess();
    
    // Toast
    Toast.show(`ORDER DISPATCHED: #${orderId} // DRONE DEPLOYED`, 'TACTICAL UPDATE //', 'green');

    // Очищаем корзину
    CartState.clearCart();

    // Создаем кнопку закрытия внутри консоли
    const output = document.getElementById('terminal-output');
    if (output) {
      const exitBtn = document.createElement('button');
      exitBtn.className = 'fit-scanner__btn fit-scanner__btn--primary js-interactive';
      exitBtn.style.marginTop = '20px';
      exitBtn.style.maxWidth = '250px';
      exitBtn.textContent = 'DISCONNECT TERMINAL //';
      exitBtn.addEventListener('click', () => {
        this.close();
      });
      output.appendChild(exitBtn);
      output.scrollTop = output.scrollHeight;
    }
  },

  /**
   * Инициализация обработчиков
   */
  initListeners() {
    const overlay = document.getElementById('checkout-terminal-overlay');
    const container = document.getElementById('terminal-container');
    const closeBtn = document.getElementById('terminal-close-btn');
    const inputField = document.getElementById('terminal-input');
    const inputRow = document.getElementById('terminal-input-row');

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        // Закрываем по клику на подложку только если заказ не в процессе отправки
        if (e.target === overlay && this.currentStep !== 4) {
          this.close();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (this.currentStep !== 4) this.close();
      });
    }

    // Фокусируем ввод при клике в любое место консоли
    if (container && inputField) {
      container.addEventListener('click', () => {
        if (this.currentStep !== 4) inputField.focus();
      });
    }

    if (inputField) {
      inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const val = inputField.value;
          inputField.value = '';
          this.handleInput(val);
        }
      });
    }

    // Сбрасываем видимость инпута при открытии в будущем
    document.addEventListener('checkout-opened', () => {
      if (inputRow) inputRow.style.display = 'flex';
    });
  }
};
