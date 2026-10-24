import React, { useState, useRef } from 'react';
import { AudioService } from '../services/audio';

import avatarGhost from '../assets/avatar-ghost.webp';
import avatarNetrunner from '../assets/avatar-netrunner.webp';
import avatarRecon from '../assets/avatar-recon.webp';

const REVIEWS = [
  {
    author: 'GHOST_OPERATOR // SEC-UNIT 7',
    avatar: avatarGhost,
    text: 'Shadow Shell Jacket — лучшая куртка для операций в дождливых секторах. Мембрана надежно отталкивает воду и грязь. 100% защита.',
    rating: 'VERIFIED BUYER // 5 STARS'
  },
  {
    author: 'NETRUNNER_0X // SYSTEM-OPS',
    avatar: avatarNetrunner,
    text: 'G-9 Visor Specs защищают глаза от встречного ветра и слепящих фар. Поляризация четкая, оправа не давит даже после 10 часов носки.',
    rating: 'VERIFIED BUYER // 5 STARS'
  },
  {
    author: 'RECON_STRIDER // URBAN-COLD',
    avatar: avatarRecon,
    text: 'C-3 Chest Rig Harness сел идеально поверх штормовой куртки. Быстросбросы Fidlock работают мгновенно одной рукой.',
    rating: 'VERIFIED BUYER // 5 STARS'
  },
  {
    author: 'PHANTOM_SPEC // TOKYO-CORE',
    avatar: avatarGhost,
    text: 'M-1 Urban Rebreather спасает в душном метро и при смоге. Сменные угольные фильтры HEPA держат форму отлично.',
    rating: 'VERIFIED BUYER // 5 STARS'
  },
  {
    author: 'CYBORG_CORE // CARGO-UNIT',
    avatar: avatarNetrunner,
    text: 'B-5 Modular Pack V2 вмещает защищенный 16" ноутбук, кабели и одежду. Швы усилены, молнии полностью влагозащитные.',
    rating: 'VERIFIED BUYER // 5 STARS'
  },
  {
    author: 'STEALTH_AGENT // MINSK-SEC',
    avatar: avatarRecon,
    text: 'S-7 Modular Sneakers имеют отличную амортизацию и превосходно цепляются за мокрый асфальт. Система быстрой шнуровки — топ.',
    rating: 'VERIFIED BUYER // 5 STARS'
  }
];

const FAQS = [
  {
    q: 'СОВМЕСТИМОСТЬ МОДУЛЕЙ И СТАНДАРТОВ //',
    a: 'Каждый элемент экипировки (сумки, риги, куртки, карманы) спроектирован с учетом стандартизированных строп Molle и быстросбросов Fidlock. Вы можете легко комбинировать модули из каталога на куртках, рюкзаках или тактических ремнях.'
  },
  {
    q: 'СКОРОСТЬ И УСЛОВИЯ АВТОНОМНОЙ ДОСТАВКИ //',
    a: 'Доставка заказов осуществляется экспресс-курьерами и UAV-дронами прямо в указанный вами сектор города. Среднее время доставки — 24–48 часов. Бесплатная доставка предоставляется при заказе от $200.'
  },
  {
    q: 'КАК ПОДОБРАТЬ РАЗМЕР В CYBER-FIT ASSISTANT //',
    a: 'Встроенный интерактивный калькулятор Cyber-Fit анализирует рост, вес, длину стопы и ладони, вычисляя оптимальный размер одежды (S–XL), обуви и перчаток. Ваши параметры автоматически сохраняются в профиле браузера.'
  },
  {
    q: 'КАК РАБОТАЮТ СКИДКИ И ПРОМОКОДЫ //',
    a: 'Вы можете использовать промокод TECH20 в корзине для получения мгновенной скидки 20%. Также загляните в личный кабинет Neural ID, где через мини-терминал можно разблокировать бонусные кредиты.'
  }
];

export const InfoSections: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    AudioService.playClick();
    if (sliderRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    AudioService.playClick();
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <section className="info-section-wrapper" style={{ marginTop: 'var(--space-xl)' }}>
        <div className="reviews-header">
          <h2 className="info-section-title">USER // TRANSMISSION LOGS (REVIEWS)</h2>
          <div className="reviews-nav">
            <button
              className="reviews-nav__btn"
              onClick={() => scrollSlider('left')}
              aria-label="Previous review"
            >
              &lt; PREV
            </button>
            <button
              className="reviews-nav__btn"
              onClick={() => scrollSlider('right')}
              aria-label="Next review"
            >
              NEXT &gt;
            </button>
          </div>
        </div>

        <div className="reviews-slider-container">
          <div className="reviews-slider" ref={sliderRef}>
            {REVIEWS.map((rev, i) => (
              <div key={i} className="review-card">
                <div className="review-card__header">
                  <div className="review-card__avatar-wrapper">
                    <img
                      className="review-card__avatar-img"
                      src={rev.avatar}
                      alt={rev.author}
                      width={48}
                      height={48}
                      loading="lazy"
                    />
                  </div>
                  <div className="review-card__meta">
                    <div className="review-card__author">{rev.author}</div>
                    <div className="review-card__rating">{rev.rating}</div>
                  </div>
                </div>
                <p className="review-card__text">"{rev.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="info-section-wrapper"
        style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}
      >
        <h2 className="info-section-title">SYSTEM // DIRECTIVES FAQ</h2>
        <div className="faq-container">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                <button
                  className="faq-item__trigger"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-item__question-text">{faq.q}</span>
                  <span className="faq-item__icon">{isOpen ? '[ - ]' : '[ + ]'}</span>
                </button>
                {isOpen && (
                  <div className="faq-item__panel" style={{ maxHeight: '200px', display: 'block' }}>
                    <div className="faq-item__content">
                      <p className="faq-item__text">{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
