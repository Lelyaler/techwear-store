import '../styles/components/cart-drawer.css';
import '../styles/components/cart-item.css';
import { CartState } from '../modules/cart.js';
import { AudioService } from '../modules/audio.js';
import { CheckoutTerminal } from './CheckoutTerminal.js';

/**
 * UI Компонент: CartDrawer (Выдвижная корзина)
 * Управляет отображением списка покупок, регулированием их количества и оформлением.
 */
export const CartDrawer = {
  /**
   * Генерация стартовой HTML-разметки корзины (App Shell)
   * @returns {string} HTML string
   */
  render() {
    return `
      <div class="cart-drawer" id="cart-drawer">
        <!-- Затеняющая подложка -->
        <div class="cart-drawer__overlay" id="cart-overlay"></div>
        
        <!-- Сама выдвижная панель -->
        <div class="cart-drawer__panel">
          <!-- Шапка корзины -->
          <div class="cart-drawer__header">
            <h3 class="cart-drawer__title">YOUR GEAR //</h3>
            <button class="cart-drawer__close" id="cart-close-btn" aria-label="Закрыть корзину">
              CLOSE // X
            </button>
          </div>
          
          <!-- Зона списка товаров (динамический рендеринг) -->
          <div class="cart-drawer__content" id="cart-drawer-content">
            <!-- Рендерится динамически методом update() -->
          </div>
          
          <!-- Подвал корзины (Итог + Кнопка оформления) -->
          <div class="cart-drawer__footer">
            <div class="cart-drawer__total">
              <span class="cart-drawer__total-label">SUBTOTAL:</span>
              <span class="cart-drawer__total-price" id="cart-total-price">0</span>
            </div>
            <button class="cart-drawer__checkout-btn" id="checkout-btn" disabled>
              INITIATE CHECKOUT
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Инициализация обработчиков событий
   */
  initListeners() {
    const overlay = document.querySelector('#cart-overlay');
    const closeBtn = document.querySelector('#cart-close-btn');
    const contentContainer = document.querySelector('#cart-drawer-content');
    const checkoutBtn = document.querySelector('#checkout-btn');

    if (overlay) overlay.addEventListener('click', () => this.close());
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    // Делегирование событий для кнопок управления внутри корзины
    if (contentContainer) {
      contentContainer.addEventListener('click', (event) => {
        const target = event.target;

        // Клик по кнопке "Минус"
        const decBtn = target.closest('.js-cart-qty-dec');
        if (decBtn) {
          const id = decBtn.dataset.id;
          const items = CartState.getItems();
          const currentItem = items.find(item => item.id === id);
          if (currentItem) {
            CartState.updateQuantity(id, currentItem.quantity - 1);
          }
        }

        // Клик по кнопке "Плюс"
        const incBtn = target.closest('.js-cart-qty-inc');
        if (incBtn) {
          const id = incBtn.dataset.id;
          const items = CartState.getItems();
          const currentItem = items.find(item => item.id === id);
          if (currentItem) {
            CartState.updateQuantity(id, currentItem.quantity + 1);
          }
        }

        // Клик по кнопке удаления
        const removeBtn = target.closest('.js-cart-remove');
        if (removeBtn) {
          const id = removeBtn.dataset.id;
          CartState.removeFromCart(id);
        }
      });
    }

    // Обработчик кнопки оформления заказа
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        CheckoutTerminal.open();
        document.dispatchEvent(new CustomEvent('checkout-opened'));
        this.close();
      });
    }

    // Слушаем шину событий для открытия/закрытия
    document.addEventListener('toggle-cart', () => {
      this.toggle();
    });

    // Реактивное обновление: перерисовываем интерфейс при изменении данных
    document.addEventListener('cart-updated', (event) => {
      const { items, total } = event.detail;
      this.update(items, total);
    });
  },

  /**
   * Открыть панель корзины
   */
  open() {
    const drawer = document.querySelector('#cart-drawer');
    if (drawer) {
      drawer.classList.add('cart-drawer--open');
      document.body.style.overflow = 'hidden';
      AudioService.playOpen(); // Звук открытия корзины
    }
  },

  /**
   * Закрыть панель корзины
   */
  close() {
    const drawer = document.querySelector('#cart-drawer');
    if (drawer) {
      drawer.classList.remove('cart-drawer--open');
      document.body.style.overflow = '';
      AudioService.playClick(); // Звук закрытия (щелчок)
    }
  },

  /**
   * Переключить открытое/закрытое состояние
   */
  toggle() {
    const drawer = document.querySelector('#cart-drawer');
    if (drawer) {
      const isOpen = drawer.classList.contains('cart-drawer--open');
      if (isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  },

  /**
   * Динамическое обновление списка товаров в DOM
   * @param {Array} items - текущие товары
   * @param {number} total - итоговая стоимость
   */
  update(items = [], total = 0) {
    const contentContainer = document.querySelector('#cart-drawer-content');
    const totalEl = document.querySelector('#cart-total-price');
    const checkoutBtn = document.querySelector('#checkout-btn');

    if (!contentContainer || !totalEl || !checkoutBtn) return;

    // Обновляем общую сумму
    totalEl.textContent = total;

    // Если корзина пуста — рендерим заглушку
    if (items.length === 0) {
      checkoutBtn.disabled = true;
      contentContainer.innerHTML = `
        <div class="cart-drawer__empty">
          <svg class="cart-drawer__empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>NO GEAR EQUIPPED //</span>
        </div>
      `;
      return;
    }

    // Если товары есть — разблокируем заказ и строим список
    checkoutBtn.disabled = false;
    contentContainer.innerHTML = items
      .map(item => `
        <div class="cart-item" data-id="${item.id}">
          <!-- Миниатюра товара -->
          <div class="cart-item__img-wrapper">
            <img class="cart-item__img" src="${item.image}" alt="${item.name}" />
          </div>
          
          <!-- Детали и контролы управления -->
          <div class="cart-item__body">
            <div class="cart-item__title" title="${item.name}">${item.name}</div>
            
            <div class="cart-item__info">
              <!-- Итоговая стоимость конкретной позиции (цена * количество) -->
              <span class="cart-item__price">${item.price * item.quantity}</span>
              
              <div style="display: flex; align-items: center; gap: var(--space-xs);">
                <!-- Управление количеством -->
                <div class="cart-item__controls">
                  <button 
                    class="cart-item__btn js-cart-qty-dec" 
                    data-id="${item.id}" 
                    aria-label="Уменьшить количество"
                  >-</button>
                  <span class="cart-item__qty">${item.quantity}</span>
                  <button 
                    class="cart-item__btn js-cart-qty-inc" 
                    data-id="${item.id}" 
                    aria-label="Увеличить количество"
                  >+</button>
                </div>
                
                <!-- Удаление позиции -->
                <button 
                  class="cart-item__remove-btn js-cart-remove" 
                  data-id="${item.id}" 
                  aria-label="Удалить из корзины"
                >
                  <svg class="cart-item__remove-icon" viewBox="0 0 24 24">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `)
      .join('');
  }
};
