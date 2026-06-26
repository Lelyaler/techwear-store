import '../styles/components/header.css';

/**
 * UI Компонент: Header (Шапка сайта)
 * Отвечает за брендинг, смену темы, звуковое сопровождение, поиск и корзину.
 */
export const Header = {
  /**
   * Генерация HTML-разметки компонента
   * @param {number} cartCount - количество товаров в корзине
   * @param {boolean} isSoundEnabled - активен ли звук в системе
   * @returns {string} HTML string
   */
  render(cartCount = 0, isSoundEnabled = false) {
    const isCartActive = cartCount > 0;
    
    return `
      <header class="header">
        <div class="header__container">
          <!-- Логотип бренда -->
          <div class="header__logo" id="header-logo" title="На главную">
            <span class="header__logo-brand">TECHWEAR</span>
            <span class="header__logo-sub">// MODULE</span>
          </div>
          
          <!-- Действия в шапке -->
          <div class="header__actions">
            <!-- Кнопка установки PWA -->
            <button class="header__btn header__btn--install" id="pwa-install-btn" aria-label="Установить приложение">
              INSTALL //
            </button>

            <!-- Кнопка переключения звука -->
            <button 
              class="header__btn header__btn--sound ${isSoundEnabled ? 'header__btn--sound--active' : ''}" 
              id="sound-toggle-btn" 
              aria-label="Включить/выключить звук"
            >
              SOUND // ${isSoundEnabled ? 'ON' : 'OFF'}
            </button>

            <!-- Кнопка переключения темы -->
            <button class="header__btn header__btn--theme" id="theme-toggle-btn" aria-label="Сменить тему">
              THEME //
            </button>

            <!-- Кнопка MBS конструктора -->
            <button class="header__btn header__btn--builder" id="builder-toggle-btn" aria-label="Открыть конструктор">
              MBS BUILDER //
            </button>
            
            <!-- Кнопка поиска -->
            <button class="header__btn header__btn--search" id="search-trigger" aria-label="Открыть поиск">
              <svg class="header__icon" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            
            <!-- Иконка Корзины -->
            <button class="header__cart" id="cart-trigger" aria-label="Открыть корзину">
              <svg class="header__cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span class="header__cart-count ${isCartActive ? 'header__cart-count--active' : ''}" id="header-cart-count">
                ${cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>
    `;
  },

  /**
   * Инициализация обработчиков событий
   */
  initListeners() {
    const searchTrigger = document.querySelector('#search-trigger');
    const cartTrigger = document.querySelector('#cart-trigger');
    const themeTrigger = document.querySelector('#theme-toggle-btn');
    const soundTrigger = document.querySelector('#sound-toggle-btn');
    const builderTrigger = document.querySelector('#builder-toggle-btn');
    const logo = document.querySelector('#header-logo');

    if (themeTrigger) {
      themeTrigger.addEventListener('click', () => {
        console.log('🎨 [Header] Dispatching toggle-theme event');
        document.dispatchEvent(new CustomEvent('toggle-theme'));
      });
    }

    if (builderTrigger) {
      builderTrigger.addEventListener('click', () => {
        console.log('🛠️ [Header] Dispatching toggle-builder event');
        document.dispatchEvent(new CustomEvent('toggle-builder'));
      });
    }

    if (soundTrigger) {
      soundTrigger.addEventListener('click', () => {
        console.log('🔊 [Header] Dispatching toggle-sound event');
        document.dispatchEvent(new CustomEvent('toggle-sound'));
      });
    }

    if (searchTrigger) {
      searchTrigger.addEventListener('click', () => {
        console.log('🔍 [Header] Dispatching toggle-search event');
        document.dispatchEvent(new CustomEvent('toggle-search'));
      });
    }

    if (cartTrigger) {
      cartTrigger.addEventListener('click', () => {
        console.log('🛒 [Header] Dispatching toggle-cart event');
        document.dispatchEvent(new CustomEvent('toggle-cart'));
      });
    }

    if (logo) {
      logo.addEventListener('click', () => {
        console.log('🏠 [Header] Dispatching navigate-home event');
        document.dispatchEvent(new CustomEvent('navigate-home'));
      });
    }
  },

  /**
   * Точечное обновление счетчика корзины без перерисовки всей шапки
   * @param {number} count - новое количество товаров
   */
  updateCartCount(count) {
    const cartCountEl = document.querySelector('#header-cart-count');
    if (!cartCountEl) return;
    
    cartCountEl.textContent = count;
    if (count > 0) {
      cartCountEl.classList.add('header__cart-count--active');
    } else {
      cartCountEl.classList.remove('header__cart-count--active');
    }
  },

  /**
   * Динамическое обновление текста и подсветки кнопки звука
   * @param {boolean} isEnabled - активен ли звук
   */
  updateSoundBtn(isEnabled) {
    const soundBtn = document.querySelector('#sound-toggle-btn');
    if (!soundBtn) return;
    
    soundBtn.textContent = isEnabled ? 'SOUND // ON' : 'SOUND // OFF';
    if (isEnabled) {
      soundBtn.classList.add('header__btn--sound--active');
    } else {
      soundBtn.classList.remove('header__btn--sound--active');
    }
  }
};
