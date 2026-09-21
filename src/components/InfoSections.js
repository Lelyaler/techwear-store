import { AudioService } from '../modules/audio.js';
import '../styles/components/info-sections.css';
import avatarGhost from '../assets/avatar-ghost.webp';
import avatarNetrunner from '../assets/avatar-netrunner.webp';
import avatarRecon from '../assets/avatar-recon.webp';

const REVIEWS = [
  {
    author: 'GHOST_OPERATOR // SEC-UNIT 7',
    avatar: avatarGhost,
    text: 'Shadow Shell Jacket — лучшая куртка для операций в дождливых секторах. Nanotech-мембрана действительно отталкивает кислотный дождь. 100% защита.',
    rating: 'SEC-LEVEL 5 // MAXIMUM'
  },
  {
    author: 'NETRUNNER_0X // DECRYPTOR',
    avatar: avatarNetrunner,
    text: 'Cyber Visor Specs спасли мои глаза при работе со светошумовыми глитч-экранами. HUD контрастный, HUD-проекция не лагает при быстром движении.',
    rating: 'SEC-LEVEL 5 // MAXIMUM'
  },
  {
    author: 'RECON_STRIDER // COLD-OPS',
    avatar: avatarRecon,
    text: 'C-3 Cyber Rig Harness сел идеально под тактическую разгрузку. Стропы прочные, замки Cobra надежные, быстро сбрасываются одной рукой.',
    rating: 'SEC-LEVEL 4 // SECURE'
  },
  {
    author: 'PHANTOM_SPEC // TOKYO-NET',
    avatar: avatarGhost,
    text: 'M-1 Cyber Rebreather Mask фильтрует любые токсичные аэрозоли в нижних уровнях мегаполиса. Рекомендую брать вместе со сменными HEPA-фильтрами.',
    rating: 'SEC-LEVEL 5 // MAXIMUM'
  },
  {
    author: 'CYBORG_CORE_02 // AUG-HEAVY',
    avatar: avatarNetrunner,
    text: 'B-5 Modular Pack V2 вмещает весь боезапас и дополнительные сменные линзы. Замки и швы усилены, молнии полностью влагозащитные. Проверен в боях.',
    rating: 'SEC-LEVEL 5 // MAXIMUM'
  },
  {
    author: 'STEALTH_AGENT // MINSK-CORE',
    avatar: avatarRecon,
    text: 'S-7 Cyber Sneakers имеют отличную амортизацию и превосходно светятся в темноте. Система автошнуровки работает без осечек. Подошва не скользит.',
    rating: 'SEC-LEVEL 4 // SECURE'
  }
];

const FAQS = [
  {
    q: 'КАК РАБОТАЕТ МОДУЛЬНАЯ СИСТЕМА MBS //',
    a: 'MBS (Modular Belt System) — это наш фирменный стандарт крепления экипировки. Каждый модуль (сумка, кобура, разгрузка, карман) имеет стандартизированные магнитные крепления Fidlock или стропы Molle. Вы можете комбинировать и цеплять любые модули на куртки, рюкзаки или ремни в нашем конструкторе.'
  },
  {
    q: 'ЧТО ТАКОЕ БЕСПИЛОТНАЯ UAV-ДОСТАВКА //',
    a: 'Доставка в сектор осуществляется автономными квадрокоптерами-курьерами серии UAV-200. После подтверждения заказа в терминале дрон стартует из ближайшего автоматизированного дока и сбрасывает посылку в герметичном контейнере в вашем секторе. Доставка занимает от 15 до 30 минут.'
  },
  {
    q: 'ЧТО ТАКOЕ БИОМЕТРИЧЕСКИЙ FIT-СКАНЕР //',
    a: 'Это встроенная утилита, которая считывает весовые и ростовые параметры вашего тела, подбирая наиболее совместимый размер одежды (S, M, L, XL) под крой конкретного бренда. Вы найдете кнопку сканера на карточке каждого товара.'
  },
  {
    q: 'КАК ПОЛУЧИТЬ СКИДОЧНЫЕ СИГНАТУРЫ (ПРОМОКОДЫ) //',
    a: 'Для получения скидок вы можете взломать защищенные сетевые узлы в интерактивном хакинг-терминале в вашем личном кабинете (кнопка "NEURAL ID //" в шапке). Выполняйте команды "scan" и "decrypt [node]", чтобы получить коды.'
  }
];

export const InfoSections = {
  render() {
    const reviewsHTML = REVIEWS.map(rev => `
      <div class="review-card">
        <div class="review-card__header">
          <div class="review-card__avatar-wrapper">
            <img class="review-card__avatar-img" src="${rev.avatar}" alt="${rev.author}" width="48" height="48" loading="lazy" decoding="async" />
          </div>
          <div class="review-card__meta">
            <div class="review-card__author">${rev.author}</div>
            <div class="review-card__rating">${rev.rating}</div>
          </div>
        </div>
        <p class="review-card__text">"${rev.text}"</p>
      </div>
    `).join('');

    const faqHTML = FAQS.map((faq, index) => `
      <div class="faq-item" data-index="${index}">
        <button class="faq-item__trigger js-interactive" aria-expanded="false">
          <span class="faq-item__question-text">${faq.q}</span>
          <span class="faq-item__icon">[ + ]</span>
        </button>
        <div class="faq-item__panel">
          <div class="faq-item__content">
            <p class="faq-item__text">${faq.a}</p>
          </div>
        </div>
      </div>
    `).join('');

    return `
      <section class="info-section-wrapper reveal" style="margin-top: var(--space-xl);">
        <div class="reviews-header">
          <h2 class="info-section-title">USER // TRANSMISSION LOGS (REVIEWS)</h2>
          <div class="reviews-nav">
            <button class="reviews-nav__btn js-interactive" id="reviews-prev" aria-label="Prev log">&lt; prev</button>
            <button class="reviews-nav__btn js-interactive" id="reviews-next" aria-label="Next log">next &gt;</button>
          </div>
        </div>
        <div class="reviews-slider-container">
          <div class="reviews-slider" id="reviews-slider-track">
            ${reviewsHTML}
          </div>
        </div>
      </section>

      <section class="info-section-wrapper reveal" style="margin-top: var(--space-xl); margin-bottom: var(--space-xl);">
        <h2 class="info-section-title">SYSTEM // DIRECTIVES FAQ</h2>
        <div class="faq-container">
          ${faqHTML}
        </div>
      </section>
    `;
  },

  initListeners() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-item__trigger');
      const panel = item.querySelector('.faq-item__panel');
      const icon = item.querySelector('.faq-item__icon');

      if (trigger && panel) {
        trigger.addEventListener('click', () => {
          const isOpen = item.classList.contains('faq-item--open');
          AudioService.playClick();

          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('faq-item--open');
              const otherTrigger = otherItem.querySelector('.faq-item__trigger');
              const otherPanel = otherItem.querySelector('.faq-item__panel');
              const otherIcon = otherItem.querySelector('.faq-item__icon');
              if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
              if (otherPanel) otherPanel.style.maxHeight = null;
              if (otherIcon) otherIcon.textContent = '[ + ]';
            }
          });

          if (isOpen) {
            item.classList.remove('faq-item--open');
            trigger.setAttribute('aria-expanded', 'false');
            panel.style.maxHeight = null;
            if (icon) icon.textContent = '[ + ]';
          } else {
            item.classList.add('faq-item--open');
            trigger.setAttribute('aria-expanded', 'true');
            panel.style.maxHeight = panel.scrollHeight + 'px';
            if (icon) icon.textContent = '[ - ]';
          }
        });
      }
    });

    const prevBtn = document.getElementById('reviews-prev');
    const nextBtn = document.getElementById('reviews-next');
    const track = document.getElementById('reviews-slider-track');

    if (prevBtn && nextBtn && track) {
      prevBtn.addEventListener('click', () => {
        AudioService.playClick();
        const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 16 : 300;
        track.scrollLeft -= cardWidth;
      });

      nextBtn.addEventListener('click', () => {
        AudioService.playClick();
        const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 16 : 300;
        track.scrollLeft += cardWidth;
      });
    }
  }
};
