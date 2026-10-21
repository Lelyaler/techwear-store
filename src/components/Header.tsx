import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { AudioService } from '../services/audio';

interface HeaderProps {
  onOpenFitScanner: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenFitScanner }) => {
  const { totalCount, openDrawer } = useCart();
  const {
    theme,
    cycleTheme,
    soundEnabled,
    ambientActive,
    toggleSound,
    toggleAmbient
  } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (targetId: string) => {
    AudioService.playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="header" id="main-header">
        <div className="header__container">
          <div
            className="header__logo"
            onClick={() => {
              AudioService.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="header__logo-brand">TECHWEAR</span>
            <span className="header__logo-sub">// OS</span>
          </div>

          <div className="header__desktop-nav">
            <button
              className="header__btn header__btn--theme"
              onClick={() => handleNavClick('catalog-controls')}
            >
              КАТАЛОГ //
            </button>
            <button
              className="header__btn header__btn--theme"
              onClick={() => {
                AudioService.playClick();
                onOpenFitScanner();
              }}
            >
              ПОДБОР РАЗМЕРА //
            </button>
          </div>

          <div className="header__actions">
            <button
              className="header__btn header__btn--theme"
              onClick={() => {
                AudioService.playClick();
                cycleTheme();
              }}
              title="Переключить цветовую тему"
              aria-label="Сменить тему оформления"
            >
              COLOR: {theme.toUpperCase()}
            </button>

            <button
              className={`header__btn header__btn--sound ${soundEnabled ? 'header__btn--sound--active' : ''}`}
              onClick={() => {
                toggleSound();
              }}
              title="Переключить звуковые эффекты"
              aria-label="Звуковые эффекты"
            >
              SFX: {soundEnabled ? 'ON' : 'OFF'}
            </button>

            <button
              className={`header__btn header__btn--ambient ${ambientActive ? 'header__btn--ambient--active' : ''}`}
              onClick={() => {
                toggleAmbient();
              }}
              title="Фоновый эмбиент"
              aria-label="Фоновый звук"
            >
              HUM: {ambientActive ? 'ON' : 'OFF'}
            </button>

            <button
              className="header__btn header__btn--cart"
              onClick={openDrawer}
              title="Корзина покупок"
              aria-label="Корзина"
            >
              <svg className="header__icon" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className={`header__cart-count ${totalCount > 0 ? 'header__cart-count--active' : ''}`}>
                {totalCount}
              </span>
            </button>

            <button
              className="header__btn header__btn--menu"
              onClick={() => {
                AudioService.playClick();
                setMobileMenuOpen(true);
              }}
              aria-label="Открыть мобильное меню"
            >
              <svg className="header__icon" viewBox="0 0 24 24">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`menu-overlay ${mobileMenuOpen ? 'menu-overlay--open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="menu-drawer__header">
            <span className="menu-drawer__title">МЕНЮ // NAVIGATION</span>
            <button
              className="menu-drawer__close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Закрыть меню"
            >
              ✕
            </button>
          </div>

          <nav className="menu-drawer__nav">
            <ul className="menu-drawer__list">
              <li>
                <button
                  className="menu-drawer__item"
                  onClick={() => handleNavClick('catalog-controls')}
                >
                  КАТАЛОГ ЭКИПИРОВКИ //
                </button>
              </li>
              <li>
                <button
                  className="menu-drawer__item"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenFitScanner();
                  }}
                >
                  КАЛЬКУЛЯТОР РАЗМЕРОВ //
                </button>
              </li>
              <li>
                <button
                  className="menu-drawer__item"
                  onClick={() => {
                    AudioService.playClick();
                    cycleTheme();
                  }}
                >
                  ТЕМА ОФОРМЛЕНИЯ: {theme.toUpperCase()}
                </button>
              </li>
              <li>
                <button
                  className="menu-drawer__item"
                  onClick={() => {
                    toggleSound();
                  }}
                >
                  ЗВУКИ И КЛИКИ (SFX): {soundEnabled ? 'ВКЛ' : 'ВЫКЛ'}
                </button>
              </li>
              <li>
                <button
                  className="menu-drawer__item"
                  onClick={() => {
                    toggleAmbient();
                  }}
                >
                  ФОНОВЫЙ ЭМБИЕНТ (HUM): {ambientActive ? 'ВКЛ' : 'ВЫКЛ'}
                </button>
              </li>
              <li>
                <button
                  className="menu-drawer__item"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openDrawer();
                  }}
                >
                  КОРЗИНА ({totalCount}) //
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
