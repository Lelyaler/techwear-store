import { CartState } from '../modules/cart.js';
import { AudioService } from '../modules/audio.js';
import { Toast } from './Toast.js';

// Импортируем изображения для конструктора
import jacketImg from '../assets/jacket.jpg';
import chestRigImg from '../assets/chest-rig.jpg';
import backpackImg from '../assets/backpack.jpg';
import visorImg from '../assets/visor.jpg';
import glovesImg from '../assets/gloves.jpg';
import sneakersImg from '../assets/sneakers.jpg';

// База данных совместимых модулей Modular Belt System
const BUILDER_PRODUCTS = [
  { id: 'mod-jacket-x1', name: 'X-1 Shadow Shell Jacket', price: 289, image: jacketImg, slot: 'body', weight: 1.8 },
  { id: 'mod-rig-c3', name: 'C-3 Cyber Rig Harness', price: 145, image: chestRigImg, slot: 'chest', weight: 0.9 },
  { id: 'mod-backpack-b5', name: 'B-5 Modular Pack V2', price: 195, image: backpackImg, slot: 'back', weight: 1.2 },
  { id: 'mod-visor-g9', name: 'G-9 Cyber Visor Specs', price: 95, image: visorImg, slot: 'head', weight: 0.2 },
  { id: 'mod-gloves-gl2', name: 'GL-2 Tactical Gloves', price: 75, image: glovesImg, slot: 'hands', weight: 0.3 },
  { id: 'mod-sneakers-s7', name: 'S-7 Cyber Sneakers', price: 220, image: sneakersImg, slot: 'feet', weight: 1.4 }
];

export const MbsBuilder = {
  equippedItems: {
    head: null,
    body: null,
    chest: null,
    back: null,
    hands: null,
    feet: null
  },
  activeSlot: 'body', // Активный выбранный слот

  /**
   * Генерация HTML разметки модального окна конструктора
   * @returns {string} HTML string
   */
  render() {
    return `
      <div class="mbs-overlay" id="mbs-overlay" aria-modal="true" role="dialog">
        <div class="mbs-modal">
          
          <!-- Шапка -->
          <div class="mbs-header">
            <div class="mbs-title-group">
              <span class="mbs-title">MBS CUSTOMIZER // v1.4</span>
              <span class="mbs-subtitle">MODULAR BELT SYSTEM COMPATIBILITY PROTOCOL</span>
            </div>
            <button class="mbs-close" id="mbs-close-btn" aria-label="Закрыть конструктор">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Рабочее пространство -->
          <div class="mbs-workspace">
            
            <!-- Левая колонка: Интерактивный чертеж -->
            <div class="mbs-blueprint">
              <div class="mbs-grid"></div>
              
              <!-- Аватар чертежа с точками -->
              <div class="mbs-avatar-wrapper">
                <svg class="mbs-avatar-svg" viewBox="0 0 100 150">
                  <!-- Контур головы -->
                  <circle cx="50" cy="20" r="10"></circle>
                  <!-- Шея -->
                  <line x1="50" y1="30" x2="50" y2="35"></line>
                  <!-- Плечи -->
                  <line x1="30" y1="35" x2="70" y2="35"></line>
                  <!-- Корпус -->
                  <rect x="33" y="35" width="34" height="60"></rect>
                  <!-- Руки -->
                  <line x1="30" y1="35" x2="20" y2="90"></line>
                  <line x1="70" y1="35" x2="80" y2="90"></line>
                  <!-- Ноги -->
                  <line x1="40" y1="95" x2="35" y2="140"></line>
                  <line x1="60" y1="95" x2="65" y2="140"></line>
                </svg>

                <!-- Точки привязки (Nodes) -->
                <div class="mbs-node" id="node-head" data-slot="head">
                  <div class="mbs-node__dot"></div>
                  <div class="mbs-node__thumb"><img id="node-head-img" src="" alt="Head Slot" /></div>
                </div>
                
                <div class="mbs-node" id="node-body" data-slot="body">
                  <div class="mbs-node__dot"></div>
                  <div class="mbs-node__thumb"><img id="node-body-img" src="" alt="Body Slot" /></div>
                </div>

                <div class="mbs-node" id="node-chest" data-slot="chest">
                  <div class="mbs-node__dot"></div>
                  <div class="mbs-node__thumb"><img id="node-chest-img" src="" alt="Chest Slot" /></div>
                </div>

                <div class="mbs-node" id="node-back" data-slot="back">
                  <div class="mbs-node__dot"></div>
                  <div class="mbs-node__thumb"><img id="node-back-img" src="" alt="Back Slot" /></div>
                </div>

                <div class="mbs-node" id="node-hands" data-slot="hands">
                  <div class="mbs-node__dot"></div>
                  <div class="mbs-node__thumb"><img id="node-hands-img" src="" alt="Hands Slot" /></div>
                </div>

                <div class="mbs-node" id="node-feet" data-slot="feet">
                  <div class="mbs-node__dot"></div>
                  <div class="mbs-node__thumb"><img id="node-feet-img" src="" alt="Feet Slot" /></div>
                </div>
              </div>
            </div>

            <!-- Правая колонка: Управление -->
            <div class="mbs-controls">
              
              <!-- Селектор слотов -->
              <div class="mbs-slots-list">
                
                <div class="mbs-slot-card" data-slot="head">
                  <div class="mbs-slot-info">
                    <span class="mbs-slot-label">Head Module //</span>
                    <span class="mbs-slot-equipped" id="slot-head-text">Empty slot</span>
                  </div>
                  <span class="mbs-slot-status-badge" id="slot-head-badge">EMPTY</span>
                </div>

                <div class="mbs-slot-card mbs-slot-card--active" data-slot="body">
                  <div class="mbs-slot-info">
                    <span class="mbs-slot-label">Shell Module //</span>
                    <span class="mbs-slot-equipped" id="slot-body-text">Empty slot</span>
                  </div>
                  <span class="mbs-slot-status-badge" id="slot-body-badge">EMPTY</span>
                </div>

                <div class="mbs-slot-card" data-slot="chest">
                  <div class="mbs-slot-info">
                    <span class="mbs-slot-label">Harness Module //</span>
                    <span class="mbs-slot-equipped" id="slot-chest-text">Empty slot</span>
                  </div>
                  <span class="mbs-slot-status-badge" id="slot-chest-badge">EMPTY</span>
                </div>

                <div class="mbs-slot-card" data-slot="back">
                  <div class="mbs-slot-info">
                    <span class="mbs-slot-label">Cargo Module //</span>
                    <span class="mbs-slot-equipped" id="slot-back-text">Empty slot</span>
                  </div>
                  <span class="mbs-slot-status-badge" id="slot-back-badge">EMPTY</span>
                </div>

                <div class="mbs-slot-card" data-slot="hands">
                  <div class="mbs-slot-info">
                    <span class="mbs-slot-label">Tactical Gloves //</span>
                    <span class="mbs-slot-equipped" id="slot-hands-text">Empty slot</span>
                  </div>
                  <span class="mbs-slot-status-badge" id="slot-hands-badge">EMPTY</span>
                </div>

                <div class="mbs-slot-card" data-slot="feet">
                  <div class="mbs-slot-info">
                    <span class="mbs-slot-label">Footwear Module //</span>
                    <span class="mbs-slot-equipped" id="slot-feet-text">Empty slot</span>
                  </div>
                  <span class="mbs-slot-status-badge" id="slot-feet-badge">EMPTY</span>
                </div>

              </div>

              <!-- Панель выбора опций -->
              <div class="mbs-selection-panel">
                <span class="mbs-selection-title" id="mbs-selection-title">AVAILABLE SHELL MODS //</span>
                <div class="mbs-options-list" id="mbs-options-list">
                  <!-- Заполняется динамически -->
                </div>
              </div>

            </div>

          </div>

          <!-- Подвал / Итоги -->
          <div class="mbs-footer">
            <div class="mbs-summary">
              <div class="mbs-summary-item">
                <span class="mbs-summary-label">SYSTEM VALUE //</span>
                <span class="mbs-summary-value mbs-summary-value--accent" id="mbs-total-price">$0</span>
              </div>
              <div class="mbs-summary-item">
                <span class="mbs-summary-label">SYSTEM LOAD //</span>
                <span class="mbs-summary-value" id="mbs-total-weight">0.0 KG</span>
              </div>
            </div>
            
            <div class="mbs-actions">
              <button class="mbs-btn mbs-btn--secondary js-interactive" id="mbs-reset-btn">
                PURGE SYSTEM //
              </button>
              <button class="mbs-btn mbs-btn--primary js-interactive" id="mbs-deploy-btn" disabled>
                DEPLOY SYSTEM [ADD ALL] //
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  /**
   * Открыть конструктор
   */
  open() {
    const overlay = document.getElementById('mbs-overlay');
    if (overlay) {
      overlay.classList.add('mbs-overlay--open');
      document.body.style.overflow = 'hidden';
      AudioService.playOpen();
    }
    
    // По дефолту активируем слот body
    this.selectSlot('body');
    this.updateUI();
  },

  /**
   * Закрыть конструктор
   */
  close() {
    const overlay = document.getElementById('mbs-overlay');
    if (overlay) {
      overlay.classList.remove('mbs-overlay--open');
      document.body.style.overflow = '';
      AudioService.playClick();
    }
  },

  /**
   * Выбор активного слота
   */
  selectSlot(slotName) {
    this.activeSlot = slotName;
    
    // Сбрасываем классы активности со всех слотов в списке и на чертеже
    document.querySelectorAll('.mbs-slot-card').forEach(card => {
      if (card.dataset.slot === slotName) {
        card.classList.add('mbs-slot-card--active');
      } else {
        card.classList.remove('mbs-slot-card--active');
      }
    });

    document.querySelectorAll('.mbs-node').forEach(node => {
      if (node.dataset.slot === slotName) {
        node.classList.add('mbs-node--active');
      } else {
        node.classList.remove('mbs-node--active');
      }
    });

    // Обновляем панель выбора товара
    const titleEl = document.getElementById('mbs-selection-title');
    if (titleEl) {
      titleEl.textContent = `AVAILABLE ${slotName.toUpperCase()} MODULES //`;
    }

    this.renderOptionsList();
  },

  /**
   * Отрисовка списка доступных товаров для активного слота
   */
  renderOptionsList() {
    const optionsContainer = document.getElementById('mbs-options-list');
    if (!optionsContainer) return;

    // Фильтруем товары совместимые с этим слотом
    const slotProducts = BUILDER_PRODUCTS.filter(p => p.slot === this.activeSlot);
    const currentlyEquipped = this.equippedItems[this.activeSlot];

    let html = `
      <!-- Опция "Пустой слот" -->
      <div class="mbs-option-row ${!currentlyEquipped ? 'mbs-option-row--selected' : ''}" data-id="none">
        <div class="mbs-option-thumb" style="display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.4);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <div class="mbs-option-body">
          <span class="mbs-option-name" style="color: var(--color-text-muted);">[ NO MODULE EQUIPPED ]</span>
          <span class="mbs-option-price">0.0 KG</span>
        </div>
      </div>
    `;

    slotProducts.forEach(prod => {
      const isSelected = currentlyEquipped && currentlyEquipped.id === prod.id;
      html += `
        <div class="mbs-option-row ${isSelected ? 'mbs-option-row--selected' : ''}" data-id="${prod.id}">
          <div class="mbs-option-thumb">
            <img src="${prod.image}" alt="${prod.name}" />
          </div>
          <div class="mbs-option-body">
            <span class="mbs-option-name">${prod.name}</span>
            <span class="mbs-option-price">$${prod.price} // ${prod.weight} KG</span>
          </div>
        </div>
      `;
    });

    optionsContainer.innerHTML = html;
  },

  /**
   * Экипировка товара в слот
   */
  equipItem(productId) {
    if (productId === 'none') {
      this.equippedItems[this.activeSlot] = null;
    } else {
      const product = BUILDER_PRODUCTS.find(p => p.id === productId);
      if (product) {
        this.equippedItems[this.activeSlot] = product;
      }
    }
    
    AudioService.playClick();
    this.updateUI();
    this.renderOptionsList(); // Обновляем выделение в панели выбора
  },

  /**
   * Обновление всего интерфейса на основе состояния
   */
  updateUI() {
    let totalPrice = 0;
    let totalWeight = 0;
    let equippedCount = 0;

    Object.keys(this.equippedItems).forEach(slot => {
      const item = this.equippedItems[slot];
      const textEl = document.getElementById(`slot-${slot}-text`);
      const badgeEl = document.getElementById(`slot-${slot}-badge`);
      const nodeEl = document.getElementById(`node-${slot}`);
      const imgEl = document.getElementById(`node-${slot}-img`);

      if (item) {
        totalPrice += item.price;
        totalWeight += item.weight;
        equippedCount++;

        if (textEl) textEl.textContent = item.name;
        if (badgeEl) {
          badgeEl.textContent = 'EQUIPPED';
          badgeEl.className = 'mbs-slot-status-badge mbs-slot-status-badge--equipped';
        }

        if (nodeEl) nodeEl.classList.add('mbs-node--equipped');
        if (imgEl) imgEl.src = item.image;
      } else {
        if (textEl) textEl.textContent = 'Empty slot';
        if (badgeEl) {
          badgeEl.textContent = 'EMPTY';
          badgeEl.className = 'mbs-slot-status-badge mbs-slot-status-badge--empty';
        }

        if (nodeEl) nodeEl.classList.remove('mbs-node--equipped');
      }
    });

    // Обновляем счетчики подвала
    const priceEl = document.getElementById('mbs-total-price');
    const weightEl = document.getElementById('mbs-total-weight');
    const deployBtn = document.getElementById('mbs-deploy-btn');

    if (priceEl) priceEl.textContent = `$${totalPrice}`;
    if (weightEl) weightEl.textContent = `${totalWeight.toFixed(1)} KG`;
    
    if (deployBtn) {
      deployBtn.disabled = equippedCount === 0;
    }
  },

  /**
   * Сбросить все слоты
   */
  reset() {
    Object.keys(this.equippedItems).forEach(slot => {
      this.equippedItems[slot] = null;
    });
    AudioService.playError();
    this.updateUI();
    this.renderOptionsList();
  },

  /**
   * Добавить все экипированные товары в корзину
   */
  deployToCart() {
    let addCount = 0;
    Object.keys(this.equippedItems).forEach(slot => {
      const item = this.equippedItems[slot];
      if (item) {
        // Добавляем в корзину (нам нужно сопоставить структуру с корзиной в main.js)
        // В main.js у товаров есть badge, specs и т.д. Добавим базовые поля.
        CartState.addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image
        });
        addCount++;
      }
    });

    if (addCount > 0) {
      AudioService.playSuccess();
      Toast.show(
        `DEPLOYED MODULE SUITE // ${addCount} ITEMS ENGAGED //`,
        'MBS CONFIG SYNC //',
        'blue'
      );
      this.close();
    }
  },

  /**
   * Инициализация обработчиков событий
   */
  initListeners() {
    const overlay = document.getElementById('mbs-overlay');
    const closeBtn = document.getElementById('mbs-close-btn');
    const resetBtn = document.getElementById('mbs-reset-btn');
    const deployBtn = document.getElementById('mbs-deploy-btn');

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.reset());
    }

    if (deployBtn) {
      deployBtn.addEventListener('click', () => this.deployToCart());
    }

    // Слушаем клики по точкам чертежа (Nodes)
    document.querySelectorAll('.mbs-node').forEach(node => {
      node.addEventListener('click', (e) => {
        const slot = node.dataset.slot;
        if (slot) {
          AudioService.playClick();
          this.selectSlot(slot);
        }
      });
    });

    // Слушаем клики по карточкам слотов
    document.querySelectorAll('.mbs-slot-card').forEach(card => {
      card.addEventListener('click', () => {
        const slot = card.dataset.slot;
        if (slot) {
          AudioService.playClick();
          this.selectSlot(slot);
        }
      });
    });

    // Делегируем клики на опции выбора товара в панели
    const optionsContainer = document.getElementById('mbs-options-list');
    if (optionsContainer) {
      optionsContainer.addEventListener('click', (e) => {
        const optionRow = e.target.closest('.mbs-option-row');
        if (optionRow) {
          const id = optionRow.dataset.id;
          this.equipItem(id);
        }
      });
    }
  }
};
