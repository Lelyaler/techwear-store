import '../styles/components/header.css';
import { AudioService } from '../modules/audio.js';

export const Header = {
  render(cartCount = 0, isSoundEnabled = false, isAmbientEnabled = false) {
    const isCartActive = cartCount > 0;
    
    return `
      <header class="header">
        <div class="header__container">
          <div class="header__logo" id="header-logo" title="На главную">
            <span class="header__logo-brand">TECHWEAR</span>
            <span class="header__logo-sub">// MODULE</span>
          </div>
          
          <div class="header__actions">
            <div class="header__desktop-nav">
              <button class="header__btn header__btn--install" id="pwa-install-btn" aria-label="Установить PWA">
                INSTALL //
              </button>

              <button class="header__btn header__btn--builder" id="builder-toggle-btn" aria-label="Открыть конструктор">
                MBS BUILDER //
              </button>
              
              <button class="header__btn header__btn--profile" id="profile-toggle-btn" aria-label="Открыть личный кабинет">
                NEURAL ID //
              </button>
            </div>
            
            <button class="header__btn header__btn--search js-interactive" id="search-trigger" aria-label="Открыть поиск">
              <svg class="header__icon" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            
            <button class="header__btn header__btn--cart js-interactive" id="cart-trigger" aria-label="Открыть корзину">
              <svg class="header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span class="header__cart-count ${isCartActive ? 'header__cart-count--active' : ''}" id="header-cart-count">
                ${cartCount}
              </span>
            </button>

            <button class="header__btn header__btn--menu js-interactive" id="menu-toggle-btn" aria-label="Открыть меню">
              <svg class="header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <div class="menu-overlay" id="menu-overlay">
          <div class="menu-drawer">
            <div class="menu-drawer__header">
              <span>SYSTEM NAVIGATION // DIRECTORY</span>
              <button class="menu-drawer__close js-interactive" id="menu-close-btn">X // CLOSE</button>
            </div>
            <div class="menu-drawer__body">
              <ul class="menu-drawer__list">
                <li>
                  <button class="menu-drawer__item js-interactive" id="menu-item-profile">
                    NEURAL ID // PROFILE
                  </button>
                </li>
                <li>
                  <button class="menu-drawer__item js-interactive" id="menu-item-builder">
                    MBS BUILDER // CUSTOMIZER
                  </button>
                </li>

                <li id="menu-item-install-wrapper" style="display: none;">
                  <button class="menu-drawer__item js-interactive" id="menu-item-install">
                    INSTALL APP // DOWNLOAD
                  </button>
                </li>
              </ul>
              <div class="menu-drawer__footer">
                STATUS: ENCRYPTED SEC_LINK
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
  },

  initListeners() {
    const searchTrigger = document.querySelector('#search-trigger');
    const cartTrigger = document.querySelector('#cart-trigger');
    const logo = document.querySelector('#header-logo');

    const themeTrigger = document.querySelector('#theme-toggle-btn');
    const soundTrigger = document.querySelector('#sound-toggle-btn');
    const ambientTrigger = document.querySelector('#ambient-toggle-btn');
    const builderTrigger = document.querySelector('#builder-toggle-btn');
    const profileTrigger = document.querySelector('#profile-toggle-btn');

    const menuTrigger = document.querySelector('#menu-toggle-btn');
    const menuOverlay = document.querySelector('#menu-overlay');
    const menuCloseBtn = document.querySelector('#menu-close-btn');

    const mProfileBtn = document.querySelector('#menu-item-profile');
    const mBuilderBtn = document.querySelector('#menu-item-builder');
    const mThemeBtn = document.querySelector('#menu-item-theme');
    const mSoundBtn = document.querySelector('#menu-item-sound');
    const mAmbientBtn = document.querySelector('#menu-item-ambient');
    const mInstallBtn = document.querySelector('#menu-item-install');

    const openMenu = () => {
      if (menuOverlay) {
        menuOverlay.classList.add('menu-overlay--open');
        document.body.style.overflow = 'hidden';
        AudioService.playOpen();
      }
    };

    const closeMenu = () => {
      if (menuOverlay) {
        menuOverlay.classList.remove('menu-overlay--open');
        document.body.style.overflow = '';
      }
    };

    if (menuTrigger) menuTrigger.addEventListener('click', openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
    if (menuOverlay) {
      menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) closeMenu();
      });
    }

    if (mProfileBtn) {
      mProfileBtn.addEventListener('click', () => {
        closeMenu();
        document.dispatchEvent(new CustomEvent('toggle-profile'));
      });
    }

    if (mBuilderBtn) {
      mBuilderBtn.addEventListener('click', () => {
        closeMenu();
        document.dispatchEvent(new CustomEvent('toggle-builder'));
      });
    }

    if (mThemeBtn) {
      mThemeBtn.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-theme'));
      });
    }

    if (mSoundBtn) {
      mSoundBtn.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-sound'));
      });
    }

    if (mAmbientBtn) {
      mAmbientBtn.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-ambient'));
      });
    }

    if (mInstallBtn) {
      mInstallBtn.addEventListener('click', () => {
        closeMenu();
        document.dispatchEvent(new CustomEvent('install-app'));
      });
    }

    if (themeTrigger) {
      themeTrigger.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-theme'));
      });
    }

    if (builderTrigger) {
      builderTrigger.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-builder'));
      });
    }

    if (profileTrigger) {
      profileTrigger.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-profile'));
      });
    }

    if (soundTrigger) {
      soundTrigger.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-sound'));
      });
    }

    if (ambientTrigger) {
      ambientTrigger.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-ambient'));
      });
    }

    if (searchTrigger) {
      searchTrigger.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-search'));
      });
    }

    if (cartTrigger) {
      cartTrigger.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-cart'));
      });
    }

    if (logo) {
      logo.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('navigate-home'));
      });
    }
  },

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

  updateSoundBtn(isEnabled) {
    const soundBtns = document.querySelectorAll('#sound-toggle-btn, #menu-item-sound');
    soundBtns.forEach(btn => {
      if (btn.id === 'sound-toggle-btn') {
        btn.textContent = isEnabled ? 'SOUND // ON' : 'SOUND // OFF';
        if (isEnabled) btn.classList.add('header__btn--sound--active');
        else btn.classList.remove('header__btn--sound--active');
      } else {
        btn.textContent = isEnabled ? 'SOUND EFFECTS // ON' : 'SOUND EFFECTS // OFF';
        if (isEnabled) btn.classList.add('menu-drawer__item--active');
        else btn.classList.remove('menu-drawer__item--active');
      }
    });
  },

  updateAmbientBtn(isActive) {
    const ambientBtns = document.querySelectorAll('#ambient-toggle-btn, #menu-item-ambient');
    ambientBtns.forEach(btn => {
      if (btn.id === 'ambient-toggle-btn') {
        btn.textContent = isActive ? 'SYS_HUM // ON' : 'SYS_HUM // OFF';
        if (isActive) btn.classList.add('header__btn--ambient--active');
        else btn.classList.remove('header__btn--ambient--active');
      } else {
        btn.textContent = isActive ? 'SYSTEM HUM (AMBIENT) // ON' : 'SYSTEM HUM (AMBIENT) // OFF';
        if (isActive) btn.classList.add('menu-drawer__item--active');
        else btn.classList.remove('menu-drawer__item--active');
      }
    });
  }
};
