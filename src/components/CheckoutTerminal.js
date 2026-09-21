import { CartState } from '../modules/cart.js';
import { AudioService } from '../modules/audio.js';
import { Toast } from './Toast.js';
import { ProfileState } from '../modules/profile.js';

export const CheckoutTerminal = {
  currentStep: 0,
  userData: {
    address: '',
    phone: '',
    email: ''
  },
  promoDiscount: 0,
  finalTotal: 0,
  paymentMethod: 'card',
  
  render() {
    return `
      <div class="checkout-terminal-overlay" id="checkout-terminal-overlay" aria-modal="true" role="dialog">
        <div class="checkout-terminal" id="terminal-container">
          
          <div class="checkout-terminal__header">
            <span>SECURE_COMM_TERMINAL // PORT: 922</span>
            <div class="checkout-terminal__window-controls">
              <span class="checkout-terminal__dot"></span>
              <span class="checkout-terminal__dot"></span>
              <span class="checkout-terminal__dot checkout-terminal__dot--fill" id="terminal-close-btn" role="button" aria-label="Close terminal window" tabindex="0" style="cursor: pointer;"></span>
            </div>
          </div>

          <div class="checkout-terminal__body" id="terminal-output"></div>

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

  open() {
    const overlay = document.getElementById('checkout-terminal-overlay');
    const inputField = document.getElementById('terminal-input');
    
    if (!overlay) return;

    overlay.classList.add('checkout-terminal-overlay--open');
    document.body.style.overflow = 'hidden';
    AudioService.playOpen();

    this.currentStep = 0;
    this.userData = { address: '', phone: '', email: '' };
    this.promoDiscount = 0;
    this.finalTotal = 0;
    this.paymentMethod = 'card';

    if (inputField) {
      setTimeout(() => inputField.focus(), 150);
    }

    this.printWelcomeSequence();
  },

  close() {
    const overlay = document.getElementById('checkout-terminal-overlay');
    if (overlay) {
      overlay.classList.remove('checkout-terminal-overlay--open');
      document.body.style.overflow = '';
      AudioService.playClick();
    }
  },

  printWelcomeSequence() {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    output.innerHTML = '';
    
    const items = CartState.getItems();
    const total = CartState.getTotal();

    this.printLine('***************************************************', 'system');
    this.printLine('*         TACTICAL GEAR DISPATCH PROTOCOL v4.2     *', 'system');
    this.printLine('*          SECURE QUANTUM ENCRYPTED CHANNEL       *', 'system');
    this.printLine('***************************************************', 'system');
    this.printLine('[SYS] Link status: SECURE // PORT: 922 ESTABLISHED');
    this.printLine('[SYS] Loading telemetry modules...');
    
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
    
    const shipName = 'TACTICAL UAV DELIVERY'.padEnd(35, '.');
    itemsGrid += `
      <div class="terminal-grid-row">
        <span>${shipName}</span>
        <span>$15.....</span>
      </div>
    `;
    
    const totalName = 'GRAND TOTAL'.padEnd(35, '.');
    itemsGrid += `
      <div class="terminal-grid-row" style="font-weight: bold; border-top: 1px dashed currentColor; margin-top: 4px; padding-top: 4px;">
        <span>${totalName}</span>
        <span>$${total + 15}.....</span>
      </div>
    `;
    itemsGrid += '</div>';

    const gridContainer = document.createElement('div');
    gridContainer.innerHTML = itemsGrid;
    output.appendChild(gridContainer);

    this.printLine('[SYS] Staging complete. Ready to record telemetry.');
    this.printLine('\n[SYS] STEP 1: ENTER SHIELDED DELIVERY SECTOR (City, Street, Apt) //');
    
    this.updatePrompt('delivery_sector:~$');
    
    output.scrollTop = output.scrollHeight;
  },

  printLine(text, type = 'default') {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    const line = document.createElement('div');
    line.className = `terminal-line terminal-line--${type}`;
    line.textContent = text;
    output.appendChild(line);
    
    output.scrollTop = output.scrollHeight;
  },

  updatePrompt(prefix) {
    const promptEl = document.getElementById('terminal-prompt-prefix');
    if (promptEl) {
      promptEl.textContent = prefix;
    }
  },

  handleInput(inputVal) {
    const trimmedVal = inputVal.trim();
    if (!trimmedVal) return;

    this.printLine(`> ${trimmedVal}`, 'user');
    AudioService.playClick();

    if (trimmedVal.toLowerCase() === 'exit' || trimmedVal.toLowerCase() === '/exit') {
      this.printLine('[SYS] Aborting connection. Closing terminal...');
      setTimeout(() => this.close(), 500);
      return;
    }

    switch (this.currentStep) {
      case 0:
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

      case 1:
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

      case 2:
        if (trimmedVal.length < 5 || !trimmedVal.includes('@') || !trimmedVal.includes('.')) {
          this.printLine('[ERR] Authentication pattern rejected. Enter valid email signature.', 'error');
          AudioService.playError();
        } else {
          this.userData.email = trimmedVal;
          this.printLine(`[SYS] Access key matching: "${this.userData.email.toUpperCase()}" [OK]`);
          this.printLine('\n[SYS] STEP 4: ENTER PROMO CODE SIGNATURE (OR TYPE "SKIP") //');
          this.updatePrompt('promo_code:~$');
          this.currentStep = 3;
        }
        break;

      case 3:
        {
          const code = trimmedVal.toUpperCase();
          const unlockedCodes = ProfileState.getDecryptedCodes();

          if (code === 'SKIP' || code === 'NONE') {
            this.promoDiscount = 0;
            this.printLine('[SYS] Proceeding without promo discount.');
          } else if (code === 'NEOHACK20' || code === 'TACTICAL15') {
            if (unlockedCodes.includes(code)) {
              this.promoDiscount = code === 'NEOHACK20' ? 0.20 : 0.15;
              this.printLine(`[SYS] PROMO CODE VERIFIED: -${this.promoDiscount * 100}% DISCOUNT ENGAGED [OK]`);
              AudioService.playSuccess();
            } else {
              this.printLine(`[ERR] ACCESS REJECTED. CODE [${code}] IS LOCKED.`, 'error');
              this.printLine('[SYS] You must decrypt this node in the Neural Link profile terminal first!', 'system');
              AudioService.playError();
              return;
            }
          } else {
            this.printLine('[ERR] INVALID PROMO SIGNATURE. ENTER VALID CODE OR "SKIP".', 'error');
            AudioService.playError();
            return;
          }

          const total = CartState.getTotal();
          const discountAmt = Math.round(total * this.promoDiscount);
          const finalTotal = total - discountAmt + 15;
          this.finalTotal = finalTotal;

          this.printLine('\n===================================================');
          this.printLine('TRANSMISSION PREVIEW //');
          this.printLine(`SECTOR: ${this.userData.address.toUpperCase()}`);
          this.printLine(`COMM NODE: ${this.userData.phone}`);
          this.printLine(`ACCESS SIGNATURE: ${this.userData.email.toUpperCase()}`);
          if (this.promoDiscount > 0) {
            this.printLine(`PROMO CODE: ${code} (-${this.promoDiscount * 100}%)`);
            this.printLine(`SUBTOTAL DISCOUNT: -$${discountAmt}`);
          }
          this.printLine(`GRAND TOTAL (WITH UAV): $${finalTotal}`);
          this.printLine('===================================================');
          this.printLine(`\n[SYS] NEURAL CREDITS BALANCE: ₵${ProfileState.getCredits()}`);
          this.printLine('[SYS] CHOOSE METHOD: ENTER "CARD" TO CONFIRM CREDIT CARD OR "CREDITS" TO PAY VIA HACKER CREDITS //');
          this.updatePrompt('payment_method(CARD/CREDITS/exit):~$');
          this.currentStep = 4;
        }
        break;

      case 4:
        {
          const val = trimmedVal.toUpperCase();
          if (val === 'CARD' || val === 'CONFIRM' || val === 'Y' || val === 'YES') {
            this.paymentMethod = 'card';
            this.currentStep = 5;
            this.runDispatchSequence();
          } else if (val === 'CREDITS') {
            const availableCredits = ProfileState.getCredits();
            if (availableCredits >= this.finalTotal) {
              ProfileState.spendCredits(this.finalTotal);
              this.paymentMethod = 'credits';
              this.printLine(`[SYS] ₵${this.finalTotal} DEBITED FROM NEURAL PORTFOLIO [OK]`);
              this.currentStep = 5;
              this.runDispatchSequence();
            } else {
              this.printLine(`[ERR] INSUFFICIENT NEURAL CREDITS. REQUIRED: ₵${this.finalTotal}, AVAILABLE: ₵${availableCredits}.`, 'error');
              this.printLine('[SYS] Enter "CARD" to pay with credit card instead, or "exit" to abort and hack more nodes.', 'system');
              AudioService.playError();
            }
          } else {
            this.printLine('[SYS] Input not recognized. Enter "CARD" to pay by card, "CREDITS" to pay by credits, or "exit" to abort.');
            AudioService.playError();
          }
        }
        break;

      default:
        this.printLine('[SYS] Command array locked. Cargo already dispatched.');
        break;
    }
  },

  runDispatchSequence() {
    const inputRow = document.getElementById('terminal-input-row');
    if (inputRow) inputRow.style.display = 'none';

    this.printLine('\n[SYS] BOOTING UAV AUTONOMOUS NAVIGATOR...');
    AudioService.playOpen();

    const terminalLogs = document.getElementById('terminal-output');
    if (!terminalLogs) {
      this.finalizeOrder();
      return;
    }

    const radarContainer = document.createElement('div');
    radarContainer.style.cssText = `
      border: 1px solid var(--border-color);
      background: rgba(6, 7, 9, 0.95);
      margin: 15px 0;
      position: relative;
      border-radius: var(--border-radius-sm);
      overflow: hidden;
      box-shadow: var(--glow-green);
    `;

    radarContainer.innerHTML = `
      <canvas id="radar-canvas" width="450" height="150" style="display: block; width: 100%; height: 150px;"></canvas>
      <div id="radar-status-text" style="
        position: absolute; 
        bottom: 8px; 
        left: 8px; 
        font-family: monospace; 
        font-size: 9px; 
        color: var(--color-accent-green);
        text-shadow: var(--glow-green);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      ">
        UAV LOGISTICS: PRE-FLIGHT VERIFICATION...
      </div>
      <div id="radar-distance-text" style="
        position: absolute; 
        bottom: 8px; 
        right: 8px; 
        font-family: monospace; 
        font-size: 9px; 
        color: var(--color-accent-green);
        text-shadow: var(--glow-green);
      ">
        DIST: 4.8 KM
      </div>
    `;

    terminalLogs.appendChild(radarContainer);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;

    const canvas = document.getElementById('radar-canvas');
    const ctx = canvas.getContext('2d');
    const statusText = document.getElementById('radar-status-text');
    const distanceText = document.getElementById('radar-distance-text');

    let progress = 0;
    let animationFrameId = null;

    const startX = 40;
    const startY = 110;
    const endX = 410;
    const endY = 40;

    const drawRadar = () => {
      ctx.fillStyle = '#060709';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-blue').trim() || '#00f0ff';
      const greenColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-green').trim() || '#00ff66';

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(0, 255, 102, 0.04)';
      ctx.beginPath();
      ctx.arc(startX, startY, 40, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(endX, endY, 45, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(startX, startY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '8px monospace';
      ctx.fillText('DOCK_09', startX - 18, startY + 15);

      ctx.fillStyle = '#ff0055';
      ctx.beginPath();
      ctx.arc(endX, endY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(`SECTOR: ${this.userData.address.toUpperCase()}`, endX - 80, endY - 10);

      const uavX = startX + (endX - startX) * progress;
      const uavY = startY + (endY - startY) * progress;

      const pulseRadius = 8 + Math.sin(Date.now() * 0.015) * 4;
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.25)';
      ctx.beginPath();
      ctx.arc(uavX, uavY, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = greenColor;
      ctx.beginPath();
      ctx.moveTo(uavX, uavY - 6);
      ctx.lineTo(uavX - 5, uavY + 4);
      ctx.lineTo(uavX + 5, uavY + 4);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '7px monospace';
      ctx.fillText(`X:${Math.round(uavX)} Y:${Math.round(uavY)}`, uavX + 8, uavY + 2);

      progress += 0.004;

      if (progress < 1) {
        const distRemaining = ((1 - progress) * 4.8).toFixed(1);
        distanceText.textContent = `DIST: ${distRemaining} KM`;

        if (progress < 0.1) {
          statusText.textContent = 'UAV LOGISTICS: LAUNCH SEQ / ROTORS SPINNING';
        } else if (progress < 0.3) {
          statusText.textContent = 'UAV LOGISTICS: CLIMB / SECTOR DENSITY ACCURACY CHECK';
        } else if (progress < 0.6) {
          statusText.textContent = 'UAV LOGISTICS: EN-ROUTE / ALTITUDE LOCK ACTIVE';
        } else if (progress < 0.85) {
          statusText.textContent = 'UAV LOGISTICS: DESCENDING TO COORDS / AUTOPILOT ON';
        } else {
          statusText.textContent = 'UAV LOGISTICS: DROP-ZONE ARRIVED / DROP INITIATED';
        }

        animationFrameId = requestAnimationFrame(drawRadar);
      } else {
        cancelAnimationFrame(animationFrameId);
        distanceText.textContent = 'DIST: 0.0 KM';
        statusText.textContent = 'UAV LOGISTICS: CARGO DISPATCH COMPLETED [OK]';
        
        setTimeout(() => {
          this.finalizeOrder();
        }, 800);
      }
    };

    drawRadar();
  },

  finalizeOrder() {
    const orderId = 'TX-' + Math.floor(100000 + Math.random() * 900000);
    
    const items = CartState.getItems();
    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const finalTotal = this.finalTotal || (CartState.getTotal() + 15);
    
    const isCredits = this.paymentMethod === 'credits';
    const cashback = ProfileState.addOrder(orderId, finalTotal, itemsCount, isCredits);

    const paymentText = isCredits ? 'NEURAL CREDITS' : 'CREDIT CARD';

    this.printLine(`\n***************************************************`);
    this.printLine(`*          ORDER SUCCESSFULLY DEPLOYED            *`);
    this.printLine(`*          SECURE ID KEY: #${orderId}          *`);
    this.printLine(`*          METHOD: ${paymentText.padEnd(30)} *`);
    if (isCredits) {
      this.printLine(`*          CREDITS SPENT: -₵${finalTotal.toString().padEnd(20)} *`);
    } else {
      this.printLine(`*          CASHBACK AWARDED: +₵${cashback.toString().padEnd(17)} *`);
    }
    this.printLine(`*          NEURAL XP REWARD: +100 XP              *`);
    this.printLine(`***************************************************`);
    this.printLine(`\n[SYS] Closing link. Stay tactical.`);

    AudioService.playSuccess();
    
    Toast.show(`ORDER DISPATCHED: #${orderId} // DRONE DEPLOYED`, 'TACTICAL UPDATE //', 'green');

    CartState.clearCart();

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

  initListeners() {
    const overlay = document.getElementById('checkout-terminal-overlay');
    const container = document.getElementById('terminal-container');
    const closeBtn = document.getElementById('terminal-close-btn');
    const inputField = document.getElementById('terminal-input');
    const inputRow = document.getElementById('terminal-input-row');

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay && this.currentStep !== 5) {
          this.close();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (this.currentStep !== 5) this.close();
      });
    }

    if (container && inputField) {
      container.addEventListener('click', () => {
        if (this.currentStep !== 5) inputField.focus();
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

    document.addEventListener('checkout-opened', () => {
      if (inputRow) inputRow.style.display = 'flex';
    });
  }
};
