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

import jacketImg from './assets/jacket.webp';
import chestRigImg from './assets/chest-rig.webp';
import backpackImg from './assets/backpack.webp';
import visorImg from './assets/visor.webp';
import glovesImg from './assets/gloves.webp';
import sneakersImg from './assets/sneakers.webp';
import maskImg from './assets/mask.webp';
import trenchImg from './assets/trench.webp';
import vestImg from './assets/vest.webp';
import slingImg from './assets/sling.webp';
import exoGlovesImg from './assets/exo-gloves.webp';
import bootsImg from './assets/boots.webp';
import shadowVisorImg from './assets/shadow-visor.webp';
import legExoImg from './assets/leg-exo.webp';
import stealthCloakImg from './assets/stealth-cloak.webp';

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

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const initializeApp = () => {
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
    }
    return `<button class="catalog-filter__btn catalog-filter__btn--locked" id="blackmarket-filter-btn" title="Reach Neural Level 2 to unlock">🔒 Locked //</button>`;
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
    <div class="scanline-overlay"></div>
    
    <div class="app">
      ${Header.render(0, AudioService.isEnabled(), AudioService.isAmbientActive())}
      
      <main class="main">
        ${CityTicker.render()}
        ${AboutBanner.render()}

        <div class="catalog-controls reveal" id="catalog-controls">
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
          
          <div class="catalog-filter" id="catalog-filter-container">
            <button class="catalog-filter__btn catalog-filter__btn--active" data-category="ALL">All</button>
            <button class="catalog-filter__btn" data-category="SHELL">Shell</button>
            <button class="catalog-filter__btn" data-category="CORE">Core</button>
            <button class="catalog-filter__btn" data-category="CARGO">Cargo</button>
            ${renderBlackMarketTabButton()}
          </div>
        </div>

        <section class="product-grid reveal" id="product-grid-container"></section>
        <div class="catalog-pagination reveal" id="catalog-pagination-container"></div>
        ${InfoSections.render()}
        ${AboutBanner.renderFeatures()}
      </main>

      ${Footer.render()}
      ${CartDrawer.render()}
    </div>

    ${FitScanner.render()}
    ${CheckoutTerminal.render()}
    ${MbsBuilder.render()}
    ${CyberProfile.render()}
    ${NeonChat.render()}

    <div class="cyber-settings-dock" id="cyber-quick-settings">
      <div class="cyber-settings-title">SYS // QUICK SETTINGS</div>
      
      <button class="cyber-settings-toggle-btn js-interactive" id="settings-toggle-trigger" title="Toggle Quick Settings" aria-label="Toggle Quick Settings">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      <div class="cyber-settings-buttons">
        <button class="cyber-settings-btn cyber-settings-btn--theme js-interactive" id="quick-theme-btn" title="Cycle System Theme" aria-label="Cycle System Theme">
          🎨 THEME
        </button>
        <button class="cyber-settings-btn js-interactive" id="quick-sound-btn" title="Toggle Sound FX" aria-label="Toggle Sound FX">
          🔊 SOUND
        </button>
        <button class="cyber-settings-btn js-interactive" id="quick-ambient-btn" title="Toggle Ambient Hum" aria-label="Toggle Ambient Hum">
          🌐 HUM
        </button>
      </div>
    </div>
  `;

  NeonChat.initListeners();

  const gridContainer = document.querySelector('#product-grid-container');
  const searchInput = document.querySelector('#catalog-search-input');
  const filterContainer = document.querySelector('#catalog-filter-container');
  const paginationContainer = document.querySelector('#catalog-pagination-container');

  let activeCategory = 'ALL';
  let searchQuery = '';
  let currentPage = 1;
  const itemsPerPage = 6;

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

  const renderCatalog = () => {
    if (!gridContainer) return;

    const filteredProducts = FilterService.filter(PRODUCTS, activeCategory, searchQuery);
    
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
      AudioService.playError();
      return;
    }

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage > totalPages) {
      currentPage = totalPages || 1;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    gridContainer.innerHTML = paginatedProducts
      .map((product, index) => ProductCard.render(product, index))
      .join('');

    renderPagination(totalPages);
  };

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

      const rotateX = ((centerY - y) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg) translateY(-6px)`;
      card.style.transition = 'transform 0.05s linear';

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

  const settingsToggleTrigger = document.querySelector('#settings-toggle-trigger');
  const settingsDock = document.querySelector('#cyber-quick-settings');

  if (settingsToggleTrigger && settingsDock) {
    settingsToggleTrigger.addEventListener('click', () => {
      settingsDock.classList.toggle('cyber-settings-dock--open');
      settingsToggleTrigger.classList.toggle('cyber-settings-toggle-btn--active');
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 600) {
        if (!settingsDock.contains(e.target)) {
          settingsDock.classList.remove('cyber-settings-dock--open');
          settingsToggleTrigger.classList.remove('cyber-settings-toggle-btn--active');
        }
      }
    });
  }

  updateQuickSettingsUI();
  renderCatalog();

  if (filterContainer) {
    filterContainer.addEventListener('click', (event) => {
      const clickedBtn = event.target.closest('.catalog-filter__btn');
      if (!clickedBtn) return;

      if (clickedBtn.classList.contains('catalog-filter__btn--locked')) {
        AudioService.playError();
        Toast.show(
          'ACCESS DENIED // NEURAL LEVEL 2 REQUIRED //',
          'LINK OFFLINE //',
          'pink'
        );
        return;
      }

      filterContainer.querySelectorAll('.catalog-filter__btn').forEach(btn => {
        btn.classList.remove('catalog-filter__btn--active');
      });
      clickedBtn.classList.add('catalog-filter__btn--active');

      activeCategory = clickedBtn.dataset.category;
      currentPage = 1;
      renderCatalog();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', debounce((event) => {
      searchQuery = event.target.value;
      currentPage = 1;
      renderCatalog();
    }, 250));
  }

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
        const catalogControls = document.getElementById('catalog-controls');
        if (catalogControls) {
          catalogControls.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  appElement.addEventListener('click', (event) => {
    const target = event.target;

    const addToCartBtn = target.closest('.js-add-to-cart');
    if (addToCartBtn) {
      const productId = addToCartBtn.dataset.id;
      const product = PRODUCTS.find(p => p.id === productId);
      
      if (product) {
        CartState.addToCart(product);
        Toast.show(`${product.name.toUpperCase()} EQUIPPED //`, 'GEAR UPDATE //', 'blue');
        AudioService.playSuccess();
      }
      return;
    }

    const fitScanBtn = target.closest('.js-fit-scan');
    if (fitScanBtn) {
      const productId = fitScanBtn.dataset.id;
      const productName = fitScanBtn.dataset.name;
      FitScanner.open(productId, productName);
      return;
    }

    const installBtn = target.closest('#pwa-install-btn');
    if (installBtn && deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
        installBtn.style.display = 'none';
      });
    }
  });

  document.addEventListener('cart-updated', (event) => {
    const { count } = event.detail;
    Header.updateCartCount(count);
  });

  document.addEventListener('fit-profile-updated', () => {
    renderCatalog();
    ProfileState.addXP(25);
  });

  document.addEventListener('profile-updated', () => {
    updateBlackMarketTabButton();
  });

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

    updateBlackMarketTabButton();
    renderCatalog();
  });

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

  document.addEventListener('install-app', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
        if (installBtn) installBtn.style.display = 'none';
        if (mInstallBtnWrapper) mInstallBtnWrapper.style.display = 'none';
      });
    }
  });

  window.addEventListener('appinstalled', () => {
    if (installBtn) installBtn.style.display = 'none';
    if (mInstallBtnWrapper) mInstallBtnWrapper.style.display = 'none';
    Toast.show('SYSTEM DEPLOYED // PWA fully installed.', 'PWA SUCCESS //', 'pink');
  });

  ProfileState.init();
  CartState.init();
  MbsBuilder.loadFromUrl();
  registerServiceWorker();

  const THEMES = ['default', 'green', 'pink', 'cyber'];
  let currentTheme = localStorage.getItem('techwear_theme') || 'default';

  const applyTheme = (theme) => {
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('techwear_theme', theme);
  };

  applyTheme(currentTheme);

  document.addEventListener('toggle-theme', () => {
    const currentIndex = THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    currentTheme = THEMES[nextIndex];
    applyTheme(currentTheme);

    const toastStyle = currentTheme === 'pink' ? 'pink' : 'blue';
    Toast.show(
      `INTERFACE SPECTRUM UPDATED: [${currentTheme.toUpperCase()}] //`,
      'THEME ENGAGED //',
      toastStyle
    );

    updateQuickSettingsUI();
  });

  document.addEventListener('toggle-sound', () => {
    const isEnabled = AudioService.toggle();
    Header.updateSoundBtn(isEnabled);
    
    if (isEnabled) {
      AudioService.playClick();
    }
    
    Toast.show(
      `SYSTEM SOUNDS: [${isEnabled ? 'ACTIVE' : 'MUTED'}] //`,
      'SYSTEM CONFIG //',
      'blue'
    );

    updateQuickSettingsUI();
  });

  document.addEventListener('toggle-ambient', () => {
    const isAmbientActive = AudioService.toggleAmbient();
    Header.updateAmbientBtn(isAmbientActive);
    
    Toast.show(
      `BACKGROUND SYSTEM HUM: [${isAmbientActive ? 'ENGAGED' : 'OFFLINE'}] //`,
      'NAVIGATOR HUM //',
      isAmbientActive ? 'green' : 'blue'
    );

    updateQuickSettingsUI();
  });

  document.addEventListener('ambient-status-updated', (event) => {
    const isAmbientActive = event.detail.active;
    Header.updateAmbientBtn(isAmbientActive);
    updateQuickSettingsUI();
  });

  document.addEventListener('toggle-builder', () => {
    MbsBuilder.open();
  });

  document.addEventListener('toggle-profile', () => {
    CyberProfile.open();
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('button, a, .catalog-filter__btn, .js-interactive')) {
      AudioService.playClick();
      
      const isAmbientEnabled = localStorage.getItem('techwear_ambient') !== 'false';
      if (isAmbientEnabled && !AudioService.isAmbientActive()) {
        AudioService.startAmbient();
      }
    }
  }, true);
};

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker.register(swUrl, { scope: import.meta.env.BASE_URL })
      .catch((error) => {
        console.warn('Service Worker registration info:', error);
      });
  }
};

document.addEventListener('DOMContentLoaded', initializeApp);
