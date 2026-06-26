import './styles/variables.css';
import './styles/base.css';
import './styles/components/product-grid.css';
import './styles/components/catalog-filter.css';
import { Header } from './components/Header.js';
import { ProductCard } from './components/ProductCard.js';
import { CartDrawer } from './components/CartDrawer.js';
import { CartState } from './modules/cart.js';
import { Toast } from './components/Toast.js';
import { FilterService } from './modules/filter.js';
import { AudioService } from './modules/audio.js';

// Импортируем изображения товаров (Vite ESM)
import jacketImg from './assets/jacket.jpg';
import chestRigImg from './assets/chest-rig.jpg';
import backpackImg from './assets/backpack.jpg';
import visorImg from './assets/visor.jpg';
import glovesImg from './assets/gloves.jpg';
import sneakersImg from './assets/sneakers.jpg';

// Расширенная база данных товаров магазина Techwear
const PRODUCTS = [
  {
    id: 'mod-jacket-x1',
    name: 'X-1 Shadow Shell Jacket',
    price: 289,
    image: jacketImg,
    badge: 'Shell Module',
    badgeClass: 'blue',
    specs: ['Waterproof', 'Cordura Shell', '3 Attachments']
  },
  {
    id: 'mod-rig-c3',
    name: 'C-3 Cyber Rig Harness',
    price: 145,
    image: chestRigImg,
    badge: 'Core Module',
    badgeClass: 'pink',
    specs: ['Tactical straps', 'Molle Grid', 'Quick-Release']
  },
  {
    id: 'mod-backpack-b5',
    name: 'B-5 Modular Pack V2',
    price: 195,
    image: backpackImg,
    badge: 'Cargo Module',
    badgeClass: 'green',
    specs: ['Waterproof zip', '25L Capacity', 'Modular expansion']
  },
  {
    id: 'mod-visor-g9',
    name: 'G-9 Cyber Visor Specs',
    price: 95,
    image: visorImg,
    badge: 'Core Module',
    badgeClass: 'blue',
    specs: ['HUD Display', 'Anti-Glare', 'UV Protection']
  },
  {
    id: 'mod-gloves-gl2',
    name: 'GL-2 Tactical Gloves',
    price: 75,
    image: glovesImg,
    badge: 'Shell Module',
    badgeClass: 'pink',
    specs: ['Carbon protection', 'Touch-screen tips', 'High Grip']
  },
  {
    id: 'mod-sneakers-s7',
    name: 'S-7 Cyber Sneakers',
    price: 220,
    image: sneakersImg,
    badge: 'Cargo Module',
    badgeClass: 'green',
    specs: ['Glow-sole', 'Modular straps', 'Shock absorption']
  }
];

/**
 * Вспомогательная функция задержки выполнения (Debounce)
 */
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Точка входа в систему Techwear & Modular Gear
const initializeApp = () => {
  const appElement = document.querySelector('#app');
  
  if (!appElement) return;

  appElement.innerHTML = `
    <!-- Эффект CRT-сканирования -->
    <div class="scanline-overlay"></div>
    
    <div class="app">
      <!-- Шапка -->
      ${Header.render(0, AudioService.isEnabled())}
      
      <!-- Основной контент -->
      <main class="main">
        <!-- Блок интро каталога -->
        <section style="margin-bottom: var(--space-md); padding-top: var(--space-md);">
          <h2 style="
            font-size: 1.5rem; 
            letter-spacing: 0.12em; 
            margin-bottom: var(--space-xs); 
            color: var(--color-text-primary);
          ">
            TACTICAL // GEAR
          </h2>
          <p style="
            color: var(--color-text-secondary); 
            max-width: 600px; 
            font-size: 0.85rem; 
            line-height: 1.6;
          ">
            Модульная городская экипировка. Каждый элемент спроектирован с учетом максимальной утилитарности и совместимости по стандартам Modular Belt System.
          </p>
        </section>

        <!-- Контрольная панель каталога (Поиск и Табы) -->
        <div class="catalog-controls">
          <!-- Поисковое поле -->
          <div class="catalog-search">
            <input 
              type="text" 
              id="catalog-search-input" 
              class="catalog-search__input" 
              placeholder="SEARCH SYSTEM //" 
              aria-label="Поиск товаров" 
              autocomplete="off" 
            />
            <svg class="catalog-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          <!-- Фильтры по модулям -->
          <div class="catalog-filter" id="catalog-filter-container">
            <button class="catalog-filter__btn catalog-filter__btn--active" data-category="ALL">All</button>
            <button class="catalog-filter__btn" data-category="SHELL">Shell</button>
            <button class="catalog-filter__btn" data-category="CORE">Core</button>
            <button class="catalog-filter__btn" data-category="CARGO">Cargo</button>
          </div>
        </div>

        <!-- Сетка каталога (динамический рендеринг) -->
        <section class="product-grid" id="product-grid-container">
          <!-- Заполняется динамически -->
        </section>
      </main>

      <!-- Выдвижная корзина (Cart Drawer) -->
      ${CartDrawer.render()}
    </div>
  `;

  const gridContainer = document.querySelector('#product-grid-container');
  const searchInput = document.querySelector('#catalog-search-input');
  const filterContainer = document.querySelector('#catalog-filter-container');

  let activeCategory = 'ALL';
  let searchQuery = '';

  /**
   * Функция отрисовки каталога на основе текущих фильтров
   */
  const renderCatalog = () => {
    if (!gridContainer) return;

    const filteredProducts = FilterService.filter(PRODUCTS, activeCategory, searchQuery);
    
    // Если ничего не найдено — выводим системную заглушку
    if (filteredProducts.length === 0) {
      gridContainer.innerHTML = `
        <div style="
          grid-column: 1 / -1; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          min-height: 35vh; 
          text-align: center; 
          color: var(--color-text-secondary); 
          font-family: var(--font-display); 
          gap: var(--space-xs);
        ">
          <svg style="width: 36px; height: 36px; stroke: var(--color-text-muted); stroke-width: 1.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <span style="
            font-size: 0.75rem; 
            letter-spacing: 0.08em; 
            color: var(--color-accent-pink); 
            text-shadow: var(--glow-pink);
          ">
            SYSTEM ERROR: NO COMPATIBLE MODULES FOUND //
          </span>
        </div>
      `;
      AudioService.playError(); // Звуковой сигнал об ошибке поиска
      return;
    }

    // Рендерим отфильтрованный список карточек
    gridContainer.innerHTML = filteredProducts
      .map(product => ProductCard.render(product))
      .join('');
  };

  // Инициализируем слушатели событий UI-компонентов
  Header.initListeners();
  CartDrawer.initListeners();

  // Делаем первый рендер каталога
  renderCatalog();

  // Обработчик переключения табов фильтрации
  if (filterContainer) {
    filterContainer.addEventListener('click', (event) => {
      const clickedBtn = event.target.closest('.catalog-filter__btn');
      if (!clickedBtn) return;

      // Переключаем класс активности
      filterContainer.querySelectorAll('.catalog-filter__btn').forEach(btn => {
        btn.classList.remove('catalog-filter__btn--active');
      });
      clickedBtn.classList.add('catalog-filter__btn--active');

      activeCategory = clickedBtn.dataset.category;
      renderCatalog();
    });
  }

  // Обработчик ввода в поиск с задержкой (Debounce)
  if (searchInput) {
    searchInput.addEventListener('input', debounce((event) => {
      searchQuery = event.target.value;
      renderCatalog();
    }, 250));
  }

  // Общий обработчик событий клика на корневом уровне (Делегирование)
  appElement.addEventListener('click', (event) => {
    const target = event.target;

    // 1. Клики по кнопке "Добавить в корзину" (ADD TO GEAR)
    const addToCartBtn = target.closest('.js-add-to-cart');
    if (addToCartBtn) {
      const productId = addToCartBtn.dataset.id;
      const product = PRODUCTS.find(p => p.id === productId);
      
      if (product) {
        CartState.addToCart(product);
        Toast.show(`${product.name.toUpperCase()} EQUIPPED //`, 'GEAR UPDATE //', 'blue');
        AudioService.playSuccess(); // Звук успешного добавления
      }
      return; // Выходим из обработчика
    }

    // 3. Клик по кнопке установки PWA
    const installBtn = target.closest('#pwa-install-btn');
    if (installBtn && deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(({ outcome }) => {
        console.log(`📱 [PWA] User choice outcome: ${outcome}`);
        deferredPrompt = null;
        installBtn.style.display = 'none';
      });
    }
  });

  // Реактивная подписка: обновляем шапку при изменении корзины
  document.addEventListener('cart-updated', (event) => {
    const { count } = event.detail;
    Header.updateCartCount(count);
  });

  // ==========================================
  // Логика установки PWA приложения (Add to Home Screen)
  // ==========================================
  let deferredPrompt;
  const installBtn = document.querySelector('#pwa-install-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
      installBtn.style.display = 'flex';
    }
  });

  // Успешная установка PWA
  window.addEventListener('appinstalled', () => {
    console.log('📱 [PWA] App installed.');
    if (installBtn) installBtn.style.display = 'none';
    Toast.show('SYSTEM DEPLOYED // PWA fully installed.', 'PWA SUCCESS //', 'pink');
  });

  // Инициализируем состояние корзины (загрузка из LocalStorage)
  CartState.init();

  // Регистрация Service Worker для поддержки оффлайн-режима
  registerServiceWorker();

  // ==========================================
  // Логика переключения цветовых тем (Cyber-Themes)
  // ==========================================
  const THEMES = ['default', 'green', 'pink', 'stealth'];
  let currentTheme = localStorage.getItem('techwear_theme') || 'default';

  /**
   * Применить выбранную тему к документу
   */
  const applyTheme = (theme) => {
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('techwear_theme', theme);
  };

  // Применяем сохраненную тему при запуске
  applyTheme(currentTheme);

  // Слушаем событие переключения темы из шапки
  document.addEventListener('toggle-theme', () => {
    const currentIndex = THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    currentTheme = THEMES[nextIndex];
    applyTheme(currentTheme);

    // Меняем цвет Toast-сообщения под тему
    const toastStyle = currentTheme === 'pink' ? 'pink' : 'blue';
    Toast.show(
      `INTERFACE SPECTRUM UPDATED: [${currentTheme.toUpperCase()}] //`,
      'THEME ENGAGED //',
      toastStyle
    );
  });

  // Слушаем событие переключения звука из шапки
  document.addEventListener('toggle-sound', () => {
    const isEnabled = AudioService.toggle();
    Header.updateSoundBtn(isEnabled);
    
    // Если включили — воспроизводим проверочный щелчок
    if (isEnabled) {
      AudioService.playClick();
    }
    
    Toast.show(
      `SYSTEM SOUNDS: [${isEnabled ? 'ACTIVE' : 'MUTED'}] //`,
      'SYSTEM CONFIG //',
      'blue'
    );
  });

  // Глобальный перехватчик кликов на фазе захвата для озвучивания всех интерактивных элементов
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('button, a, .catalog-filter__btn, .js-interactive')) {
      AudioService.playClick();
    }
  }, true); // true активирует фазу capture, чтобы сработало раньше других слушателей

  console.log('👾 [Techwear OS] System and CartState initialized successfully.');
};

/**
 * Регистрация Service Worker для оффлайн-работы PWA
 */
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('📡 [PWA] Service Worker registered. Scope:', registration.scope);
      })
      .catch((error) => {
        console.error('❌ [PWA] Service Worker registration failed:', error);
      });
  }
};

document.addEventListener('DOMContentLoaded', initializeApp);
