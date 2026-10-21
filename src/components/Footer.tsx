import React from 'react';
import { AudioService } from '../services/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    AudioService.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="main-footer">
      <div className="footer__container">
        <div className="footer__section">
          <div className="footer__logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
            <span className="footer__logo-brand">TECHWEAR</span>
            <span className="footer__logo-sub">// OS</span>
          </div>
          <p className="footer__copyright">
            Modular Cybernetic Apparel Platform. Проектирование технологичной экипировки и аксессуаров
            нового поколения. Полная влаго- и ветрозащита по стандарту 20,000мм.
          </p>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            © 2026 TECHWEAR LABS. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
          </div>
        </div>

        <div className="footer__section">
          <div className="footer__title">НАВИГАЦИЯ //</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
            <a
              href="#catalog-controls"
              style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
              onClick={() => AudioService.playClick()}
            >
              &gt; Каталог экипировки
            </a>
            <a
              href="#tech-specs"
              style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
              onClick={() => AudioService.playClick()}
            >
              &gt; Спецификации материалов
            </a>
            <a
              href="#faq-section"
              style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
              onClick={() => AudioService.playClick()}
            >
              &gt; Доставка и частые вопросы
            </a>
          </div>
        </div>

        <div className="footer__section">
          <div className="footer__title">ИНФОРМАЦИЯ //</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>
              Доставка: экспресс-курьеры и дроны 24-48ч
            </span>
            <span style={{ color: 'var(--color-text-muted)' }}>
              Бесплатная доставка от $200
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-accent-blue)',
                textAlign: 'left',
                padding: 0,
                fontSize: '0.8rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              &gt; НАВЕРХ СТРАНИЦЫ [^]
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
