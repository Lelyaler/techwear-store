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
import './styles/components/fit-scanner.css';
import { FitScanner } from './components/FitScanner.js';
import './styles/components/checkout-terminal.css';
import { CheckoutTerminal } from './components/CheckoutTerminal.js';
import './styles/components/mbs-builder.css';
import { MbsBuilder } from './components/MbsBuilder.js';
import { ProfileState } from './modules/profile.js';
import { CyberProfile } from './components/CyberProfile.js';
import { AboutBanner } from './components/AboutBanner.js';
import { InfoSections } from './components/InfoSections.js';
import { Footer } from './components/Footer.js';
import { CityTicker } from './components/CityTicker.js';
import { NeonChat } from './components/NeonChat.js';
import './styles/components/settings-dock.css';

// Импортируем изображения товаров (Vite ESM)
import jacketImg from './assets/jacket.jpg';
import chestRigImg from './assets/chest-rig.jpg';
import backpackImg from './assets/backpack.jpg';
import visorImg from './assets/visor.jpg';
import glovesImg from './assets/gloves.jpg';
import sneakersImg from './assets/sneakers.jpg';
import maskImg from './assets/mask.jpg';
import trenchImg from './assets/trench.jpg';
import vestImg from './assets/vest.jpg';
import slingImg from './assets/sling.jpg';
import exoGlovesImg from './assets/exo-gloves.jpg';
import bootsImg from './assets/boots.jpg';
import shadowVisorImg from './assets/shadow-visor.jpg';
import legExoImg from './assets/leg-exo.jpg';
import stealthCloakImg from './assets/stealth-cloak.jpg';

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
  },
  {
    id: 'mod-mask-m1',
    name: 'M-1 Cyber Rebreather Mask',
    price: 120,
    image: maskImg,
    badge: 'Core Module',
    badgeClass: 'pink',
    specs: ['HEPA Filter', 'Dual Intake', 'Magnetic straps']
  },
  {
    id: 'mod-trench-x2',
    name: 'X-2 Tactical Trench Coat',
    price: 310,
    image: trenchImg,
    badge: 'Shell Module',
    badgeClass: 'blue',
    specs: ['Nanotech Shell', 'Modular Collar', 'Magnetic Snaps']
  },
  {
    id: 'mod-vest-v8',
    name: 'V-8 Recon Tactical Vest',
    price: 180,
    image: vestImg,
    badge: 'Core Module',
    badgeClass: 'pink',
    specs: ['Armor plate pockets', 'Laser cut Molle', 'Lightweight mesh']
  },
  {
    id: 'mod-sling-b6',
    name: 'B-6 Tactical Sling Bag',
    price: 135,
    image: slingImg,
    badge: 'Cargo Module',
    badgeClass: 'green',
    specs: ['Sling strap', 'Quick release Cobra', 'Waterproof zip']
  },
  {
    id: 'mod-gloves-gl5',
    name: 'GL-5 Exo-Skeletal Gloves',
    price: 95,
    image: exoGlovesImg,
    badge: 'Shell Module',
    badgeClass: 'pink',
    specs: ['Exo protection', 'Heated grip pads', 'Conductive fingertips']
  },
  {
    id: 'mod-boots-bt9',
    name: 'BT-9 Exo-Steel Boots',
    price: 260,
    image: bootsImg,
    badge: 'Cargo Module',
    badgeClass: 'green',
    specs: ['Steel toe armor', 'Exo-cushion sole', 'Auto-lacing locks']
  },
  {
    id: 'mod-jacket-j4',
    name: 'J-4 Storm Shell Windbreaker',
    price: 240,
    image: jacketImg,
    badge: 'Shell Module',
    badgeClass: 'blue',
    specs: ['Lightweight', 'Wind-Resistant', 'Packable']
  },
  {
    id: 'mod-mask-m2',
    name: 'M-2 Filtration Shield',
    price: 110,
    image: maskImg,
    badge: 'Core Module',
    badgeClass: 'pink',
    specs: ['Level 2 HEPA', 'Breathable Mesh', 'Adjustable Fit']
  },
  {
    id: 'mod-backpack-b7',
    name: 'B-7 Cargo Rucksack',
    price: 215,
    image: backpackImg,
    badge: 'Cargo Module',
    badgeClass: 'green',
    specs: ['35L Volume', 'Laptop Pocket', 'Waterproof Zips']
  },
  {
    id: 'mod-rig-c4',
    name: 'C-4 Comm-Link Chest Plate',
    price: 155,
    image: chestRigImg,
    badge: 'Core Module',
    badgeClass: 'pink',
    specs: ['Comms-Integrated', 'Laser-Cut Grid', 'FIDLOCK Buckles']
  },
  {
    id: 'mod-sneakers-s8',
    name: 'S-8 Street Ranger Shoes',
    price: 235,
    image: sneakersImg,
    badge: 'Cargo Module',
    badgeClass: 'green',
    specs: ['Exo-Grip Outsole', 'Water-Resistant Upper', 'Quick-Lacing']
  },
  {
    id: 'mod-trench-x3',
    name: 'X-3 Cyberpunk Overcoat',
    price: 325,
    image: trenchImg,
    badge: 'Shell Module',
    badgeClass: 'blue',
    specs: ['Gore-Tex Shell', 'Reinforced Elbows', 'FIDLOCK Collar']
  },
  {
    id: 'mod-visor-shadow',
    name: 'M-9 Shadow-Link HUD Visor',
    price: 450,
    image: shadowVisorImg,
    badge: 'Black Market',
    badgeClass: 'pink',
    specs: ['Military HUD', 'Synaptic Sync', 'Target Tracker']
  },
  {
    id: 'mod-leg-exo',
    name: 'EXO-7 Cybernetic Leg Augment',
    price: 750,
    image: legExoImg,
    badge: 'Black Market',
    badgeClass: 'pink',
    specs: ['Exo-steel frame', 'Sprint booster', 'Shock dampers']
  },
  {
    id: 'mod-cloak-stealth',
    name: 'N-3 Nano-Tech Stealth Cloak',
    price: 600,
    image: stealthCloakImg,
    badge: 'Black Market',
    badgeClass: 'pink',
    specs: ['Thermal invisibility', 'Active camouflage', 'Silent movement']
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
  // Инициализация дефолтных настроек в LocalStorage для предотвращения кэш-багов
  if (localStorage.getItem('techwear_theme') === null || localStorage.getItem('techwear_theme') === 'stealth') {
    localStorage.setItem('techwear_theme', 'default');
  }
  if (localStorage.getItem('techwear_sound') === null) {
    localStorage.setItem('techwear_sound', 'true');
  }
  if (localStorage.getItem('techwear_ambient') === null) {
    localStorage.setItem('techwear_ambient', 'true');
  }

  const appElement = document.querySelector('#app');
  
  if (!appElement) return;

  const renderBlackMarketTabButton = () => {
    const level = ProfileState.getLevel();
    if (level >= 2) {
      return `<button class="catalog-filter__btn catalog-filter__btn--blackmarket" data-category="BLACKMARKET" id="blackmarket-filter-btn">⚡ Black Market //</button>`;
    } else {
      return `<button class="catalog-filter__btn catalog-filter__btn--locked" id="blackmarket-filter-btn" title="Reach Neural Level 2 to unlock">🔒 Locked //</button>`;
    }
  };

  const updateBlackMarketTabButton = () => {
    const btn = document.querySelector('#blackmarket-filter-btn');
    if (!btn) return;

    const level = ProfileState.getLevel();
    if (level >= 2) {
      btn.className = 'catalog-filter__btn catalog-filter__btn--blackmarket';
      btn.dataset.category = 'BLACKMARKET';
      btn.textContent = '⚡ Black Market //';
      btn.removeAttribute('title');
    } else {
      btn.className = 'catalog-filter__btn catalog-filter__btn--locked';
      btn.dataset.category = '';
      btn.textContent = '🔒 Locked //';
      btn.setAttribute('title', 'Reach Neural Level 2 to unlock');
    }
  };

  appElement.innerHTML = `
    <!-- Эффект CRT-сканирования -->
    <div class="scanline-overlay"></div>
    
    <div class="app">
      <!-- Шапка -->
      ${Header.render(0, AudioService.isEnabled(), AudioService.isAmbientActive())}
      
      <!-- Основной контент -->
      <main class="main">
        <!-- Бегущая строка чрезвычайных сводок Сити -->
        ${CityTicker.render()}

        <!-- Герой-баннер и интро о бренде -->
        ${AboutBanner.render()}

        <!-- Контрольная панель каталога (Поиск и Табы) -->
        <div class="catalog-controls reveal" id="catalog-controls">
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
            ${renderBlackMarketTabButton()}
          </div>
        </div>

        <!-- Сетка каталога (динамический рендеринг) -->
        <section class="product-grid reveal" id="product-grid-container">
          <!-- Заполняется динамически -->
        </section>

        <!-- Пагинация каталога -->
        <div class="catalog-pagination reveal" id="catalog-pagination-container"></div>

        <!-- Отзывы и FAQ -->
        ${InfoSections.render()}

        <!-- Блок с описанием ключевых особенностей (MBS Modular System) -->
        ${AboutBanner.renderFeatures()}
      </main>

      <!-- Футер сайта -->
      ${Footer.render()}

      <!-- Выдвижная корзина (Cart Drawer) -->
      ${CartDrawer.render()}
    </div>

    <!-- Интерактивный сканер размеров -->
    ${FitScanner.render()}

    <!-- Военный консольный терминал оформления заказа -->
    ${CheckoutTerminal.render()}

    <!-- Конструктор модулей Modular Belt System -->
    ${MbsBuilder.render()}

    <!-- Личный кабинет пользователя и терминал взлома -->
    ${CyberProfile.render()}

    <!-- ИИ Чат-Ассистент N.E.O.N. Cortex -->
    ${NeonChat.render()}

    <!-- Панель быстрых настроек системы -->
    <div class="cyber-settings-dock" id="cyber-quick-settings">
      <div class="cyber-settings-title">SYS // QUICK SETTINGS</div>
      
      <!-- Кнопка-триггер для мобильных устройств -->
      <button class="cyber-settings-toggle-btn js-interactive" id="settings-toggle-trigger" title="Toggle Quick Settings">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      <div class="cyber-settings-buttons">
        <button class="cyber-settings-btn cyber-settings-btn--theme js-interactive" id="quick-theme-btn" title="Cycle System Theme">
          🎨 THEME
        </button>
        <button class="cyber-settings-btn js-interactive" id="quick-sound-btn" title="Toggle Sound FX">
          🔊 SOUND
        </button>
        <button class="cyber-settings-btn js-interactive" id="quick-ambient-btn" title="Toggle Ambient Hum">
          🌐 HUM
        </button>
      </div>
    </div>
  `;

  // Инициализируем обработчики событий для ИИ Чата
  NeonChat.initListeners();

  const gridContainer = document.querySelector('#product-grid-container');
  const searchInput = document.querySelector('#catalog-search-input');
  const filterContainer = document.querySelector('#catalog-filter-container');
  const paginationContainer = document.querySelector('#catalog-pagination-container');

  let activeCategory = 'ALL';
  let searchQuery = '';
  let currentPage = 1;
  const itemsPerPage = 6;

  /**
   * Функция отрисовки кнопок переключения страниц (Пагинации)
   */
  const renderPagination = (totalPages) => {
    if (!paginationContainer) return;

    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let html = `
      <button class="pagination__btn js-pagination-prev" ${currentPage === 1 ? 'disabled' : ''} title="Previous Page">
        &lt;
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      html += `
        <button class="pagination__btn ${i === currentPage ? 'pagination__btn--active' : ''} js-pagination-page" data-page="${i}">
          ${i}
        </button>
      `;
    }

    html += `
      <button class="pagination__btn js-pagination-next" ${currentPage === totalPages ? 'disabled' : ''} title="Next Page">
        &gt;
      </button>
    `;

    paginationContainer.innerHTML = html;
  };

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
      if (paginationContainer) paginationContainer.innerHTML = '';
      AudioService.playError(); // Звуковой сигнал об ошибке поиска
      return;
    }

    // Рассчитываем параметры пагинации
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage > totalPages) {
      currentPage = totalPages || 1;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    // Рендерим отфильтрованный список карточек (только 6 штук на страницу)
    gridContainer.innerHTML = paginatedProducts
      .map((product, index) => ProductCard.render(product, index))
      .join('');

    // Отрисовываем кнопки пагинации
    renderPagination(totalPages);
  };

  // Инициализируем слушатели событий UI-компонентов
  Header.initListeners();
  CartDrawer.initListeners();
  FitScanner.initListeners();
  CheckoutTerminal.initListeners();
  MbsBuilder.initListeners();
  CyberProfile.initListeners();
  AboutBanner.initListeners();
  InfoSections.initListeners();
  Footer.initListeners();
  CityTicker.initListeners();

  // Настройка скролл-анимаций (Intersection Observer)
  const setupScrollAnimations = () => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--active');
        } else {
          entry.target.classList.remove('reveal--active');
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  };
  setupScrollAnimations();

  // Настройка интерактивного 3D Tilt эффекта на карточках товаров с бликом
  const setup3DTiltEffects = () => {
    if (!gridContainer) return;

    gridContainer.addEventListener('mousemove', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Максимальный угол наклона 7 градусов
      const rotateX = ((centerY - y) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg) translateY(-6px)`;
      card.style.transition = 'transform 0.05s linear';

      // Передаем координаты для CSS-блика
      card.style.setProperty('--mouse-x', `${((x / rect.width) * 100).toFixed(0)}%`);
      card.style.setProperty('--mouse-y', `${((y / rect.height) * 100).toFixed(0)}%`);
    });

    gridContainer.addEventListener('mouseout', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;

      const related = e.relatedTarget;
      if (related && card.contains(related)) return;

      card.style.transform = '';
      card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  };
  setup3DTiltEffects();

  // Функция обновления состояния кнопок быстрого доступа (Quick Settings)
  const updateQuickSettingsUI = () => {
    const soundBtn = document.querySelector('#quick-sound-btn');
    const ambientBtn = document.querySelector('#quick-ambient-btn');
    const themeBtn = document.querySelector('#quick-theme-btn');
    
    if (soundBtn) {
      const isSoundEnabled = AudioService.isEnabled();
      if (isSoundEnabled) {
        soundBtn.classList.add('cyber-settings-btn--active');
        soundBtn.innerHTML = '🔊 SOUND // ON';
      } else {
        soundBtn.classList.remove('cyber-settings-btn--active');
        soundBtn.innerHTML = '🔇 SOUND // OFF';
      }
    }
    
    if (ambientBtn) {
      const isAmbientEnabled = localStorage.getItem('techwear_ambient') !== 'false';
      if (isAmbientEnabled) {
        ambientBtn.classList.add('cyber-settings-btn--active');
        ambientBtn.innerHTML = '🌐 HUM // ON';
      } else {
        ambientBtn.classList.remove('cyber-settings-btn--active');
        ambientBtn.innerHTML = '💤 HUM // OFF';
      }
    }

    if (themeBtn) {
      const theme = localStorage.getItem('techwear_theme') || 'default';
      themeBtn.innerHTML = `🎨 THEME: ${theme.toUpperCase()}`;
    }
  };

  // Слушатели кликов по кнопкам быстрой настройки
  const quickThemeBtn = document.querySelector('#quick-theme-btn');
  const quickSoundBtn = document.querySelector('#quick-sound-btn');
  const quickAmbientBtn = document.querySelector('#quick-ambient-btn');
  
  if (quickThemeBtn) {
    quickThemeBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('toggle-theme'));
    });
  }
  if (quickSoundBtn) {
    quickSoundBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('toggle-sound'));
    });
  }
  if (quickAmbientBtn) {
    quickAmbientBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('toggle-ambient'));
    });
  }

  // Настройка мобильного переключателя быстрых настроек
  const settingsToggleTrigger = document.querySelector('#settings-toggle-trigger');
  const settingsDock = document.querySelector('#cyber-quick-settings');

  if (settingsToggleTrigger && settingsDock) {
    settingsToggleTrigger.addEventListener('click', () => {
      settingsDock.classList.toggle('cyber-settings-dock--open');
      settingsToggleTrigger.classList.toggle('cyber-settings-toggle-btn--active');
    });

    // Автоматическое закрытие панели при клике в пустом месте на мобильных экранах
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 600) {
        if (!settingsDock.contains(e.target)) {
          settingsDock.classList.remove('cyber-settings-dock--open');
          settingsToggleTrigger.classList.remove('cyber-settings-toggle-btn--active');
        }
      }
    });
  }

  // Обновляем UI быстрой настройки при инициализации
  updateQuickSettingsUI();

  // Делаем первый рендер каталога
  renderCatalog();

  // Обработчик переключения табов фильтрации
  if (filterContainer) {
    filterContainer.addEventListener('click', (event) => {
      const clickedBtn = event.target.closest('.catalog-filter__btn');
      if (!clickedBtn) return;

      // Если кликнули на заблокированный таб Черного Рынка
      if (clickedBtn.classList.contains('catalog-filter__btn--locked')) {
        AudioService.playError();
        Toast.show(
          'ACCESS DENIED // NEURAL LEVEL 2 REQUIRED //',
          'LINK OFFLINE //',
          'pink'
        );
        return;
      }

      // Переключаем класс активности
      filterContainer.querySelectorAll('.catalog-filter__btn').forEach(btn => {
        btn.classList.remove('catalog-filter__btn--active');
      });
      clickedBtn.classList.add('catalog-filter__btn--active');

      activeCategory = clickedBtn.dataset.category;
      currentPage = 1; // Сброс страницы на 1 при смене категории
      renderCatalog();
    });
  }

  // Обработчик ввода в поиск с задержкой (Debounce)
  if (searchInput) {
    searchInput.addEventListener('input', debounce((event) => {
      searchQuery = event.target.value;
      currentPage = 1; // Сброс страницы на 1 при вводе в поиск
      renderCatalog();
    }, 250));
  }

  // Обработчик кликов по кнопкам пагинации страниц
  if (paginationContainer) {
    paginationContainer.addEventListener('click', (e) => {
      const prevBtn = e.target.closest('.js-pagination-prev');
      const nextBtn = e.target.closest('.js-pagination-next');
      const pageBtn = e.target.closest('.js-pagination-page');
      
      const totalFiltered = FilterService.filter(PRODUCTS, activeCategory, searchQuery).length;
      const totalPages = Math.ceil(totalFiltered / itemsPerPage);

      let changed = false;

      if (prevBtn && currentPage > 1) {
        currentPage--;
        changed = true;
      } else if (nextBtn && currentPage < totalPages) {
        currentPage++;
        changed = true;
      } else if (pageBtn) {
        const pageNum = parseInt(pageBtn.dataset.page, 10);
        if (pageNum && pageNum !== currentPage) {
          currentPage = pageNum;
          changed = true;
        }
      }

      if (changed) {
        AudioService.playClick();
        renderCatalog();
        // Скроллим к шапке каталога
        const catalogControls = document.getElementById('catalog-controls');
        if (catalogControls) {
          catalogControls.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
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

    // 2. Клик по кнопке запуска сканера размеров
    const fitScanBtn = target.closest('.js-fit-scan');
    if (fitScanBtn) {
      const productId = fitScanBtn.dataset.id;
      const productName = fitScanBtn.dataset.name;
      FitScanner.open(productId, productName);
      return;
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

  // Реактивная подписка на обновление профиля размеров (начисляем 25 XP)
  document.addEventListener('fit-profile-updated', () => {
    renderCatalog();
    ProfileState.addXP(25);
  });

  // Реактивная подписка на обновление профиля
  document.addEventListener('profile-updated', () => {
    updateBlackMarketTabButton();
  });

  // Реактивная подписка на повышение уровня (геймификация)
  document.addEventListener('level-up', (event) => {
    const { level } = event.detail;
    AudioService.playSuccess();
    Toast.show(
      `SYSTEM RANK UPDATED: LEVEL ${level} //`,
      'LEVEL UP //',
      'pink'
    );

    if (level === 2) {
      setTimeout(() => {
        Toast.show(
          'BLACK MARKET COMM-LINK ESTABLISHED // CATALOG UNLOCKED //',
          'SECURITY DECRYPTED //',
          'green'
        );
      }, 1500);
    }

    // Обновляем состояние кнопки в UI и перерисовываем каталог
    updateBlackMarketTabButton();
    renderCatalog();
  });

  // ==========================================
  // Логика установки PWA приложения (Add to Home Screen)
  // ==========================================
  let deferredPrompt;
  const installBtn = document.querySelector('#pwa-install-btn');
  const mInstallBtnWrapper = document.querySelector('#menu-item-install-wrapper');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
      installBtn.style.display = 'flex';
    }
    if (mInstallBtnWrapper) {
      mInstallBtnWrapper.style.display = 'block';
    }
  });

  // Слушаем событие установки PWA из мобильного меню
  document.addEventListener('install-app', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(({ outcome }) => {
        console.log(`📱 [PWA] User choice outcome: ${outcome}`);
        deferredPrompt = null;
        if (installBtn) installBtn.style.display = 'none';
        if (mInstallBtnWrapper) mInstallBtnWrapper.style.display = 'none';
      });
    }
  });

  // Успешная установка PWA
  window.addEventListener('appinstalled', () => {
    console.log('📱 [PWA] App installed.');
    if (installBtn) installBtn.style.display = 'none';
    if (mInstallBtnWrapper) mInstallBtnWrapper.style.display = 'none';
    Toast.show('SYSTEM DEPLOYED // PWA fully installed.', 'PWA SUCCESS //', 'pink');
  });

  // Инициализируем состояние профиля и кошелька
  ProfileState.init();

  // Инициализируем состояние корзины (загрузка из LocalStorage)
  CartState.init();

  // Загружаем экипировку из параметров URL, если они присутствуют
  MbsBuilder.loadFromUrl();

  // Регистрация Service Worker для поддержки оффлайн-режима
  registerServiceWorker();

  // ==========================================
  // Логика переключения цветовых тем (Cyber-Themes)
  // ==========================================
  const THEMES = ['default', 'green', 'pink', 'cyber'];
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

    // Синхронизируем панель быстрых настроек
    updateQuickSettingsUI();
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

    // Синхронизируем панель быстрых настроек
    updateQuickSettingsUI();
  });

  // Слушаем событие переключения фонового эмбиента из шапки
  document.addEventListener('toggle-ambient', () => {
    const isAmbientActive = AudioService.toggleAmbient();
    Header.updateAmbientBtn(isAmbientActive);
    
    Toast.show(
      `BACKGROUND SYSTEM HUM: [${isAmbientActive ? 'ENGAGED' : 'OFFLINE'}] //`,
      'NAVIGATOR HUM //',
      isAmbientActive ? 'green' : 'blue'
    );

    // Синхронизируем панель быстрых настроек
    updateQuickSettingsUI();
  });

  // Синхронизируем состояние кнопок при автоматическом включении/выключении гула
  document.addEventListener('ambient-status-updated', (event) => {
    const isAmbientActive = event.detail.active;
    Header.updateAmbientBtn(isAmbientActive);
    updateQuickSettingsUI();
  });

  // Слушаем событие открытия конструктора MBS из шапки
  document.addEventListener('toggle-builder', () => {
    MbsBuilder.open();
  });

  // Слушаем событие открытия личного кабинета из шапки
  document.addEventListener('toggle-profile', () => {
    CyberProfile.open();
  });

  // Глобальный перехватчик кликов на фазе захвата для озвучивания всех интерактивных элементов
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('button, a, .catalog-filter__btn, .js-interactive')) {
      AudioService.playClick();
      
      // Автоматический запуск эмбиента при первом взаимодействии с интерактивным элементом
      const isAmbientEnabled = localStorage.getItem('techwear_ambient') !== 'false';
      if (isAmbientEnabled && !AudioService.isAmbientActive()) {
        AudioService.startAmbient();
      }
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
