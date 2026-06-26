import '../styles/components/cart-drawer.css';

/**
 * UI Компонент: CartDrawer (Выдвижная корзина)
 * Отвечает за отображение выбранного снаряжения и инициирование оформления заказа.
 */
export const CartDrawer = {
  /**
   * Генерация HTML-разметки корзины
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
          
          <!-- Зона списка товаров (по умолчанию пуста) -->
          <div class="cart-drawer__content" id="cart-drawer-content">
            <div class="cart-drawer__empty">
              <svg class="cart-drawer__empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>NO GEAR EQUIPPED //</span>
            </div>
          </div>
          
          <!-- Подвал корзины (Сумма и кнопка заказа) -->
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
   * Инициализация слушателей событий для корзины
   */
  initListeners() {
    const overlay = document.querySelector('#cart-overlay');
    const closeBtn = document.querySelector('#cart-close-btn');

    if (overlay) {
      overlay.addEventListener('click', () => this.close());
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Слушаем шину событий для открытия/закрытия
    document.addEventListener('toggle-cart', () => {
      this.toggle();
    });
  },

  /**
   * Открыть корзину
   */
  open() {
    const drawer = document.querySelector('#cart-drawer');
    if (drawer) {
      drawer.classList.add('cart-drawer--open');
      document.body.style.overflow = 'hidden'; // Отключаем скролл страницы
    }
  },

  /**
   * Закрыть корзину
   */
  close() {
    const drawer = document.querySelector('#cart-drawer');
    if (drawer) {
      drawer.classList.remove('cart-drawer--open');
      document.body.style.overflow = ''; // Восстанавливаем скролл
    }
  },

  /**
   * Переключить состояние корзины
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
  }
};
