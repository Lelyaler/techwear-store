import femaleBannerImg from '../assets/techwear-banner.webp';
import maleBannerImg from '../assets/techwear-male-banner.webp';
import cyberBannerImg from '../assets/techwear-cyber-banner.webp';
import pilotBannerImg from '../assets/techwear-pilot-banner.webp';
import { AudioService } from '../modules/audio.js';
import '../styles/components/about-banner.css';

export const AboutBanner = {
  render() {
    return `
      <section class="hero-banner reveal">
        <div class="hero-banner__image-wrapper">
          <img 
            class="hero-banner__image hero-banner__image--active" 
            src="${femaleBannerImg}" 
            alt="Techwear Tactical Gear" 
            id="hero-banner-img-female" 
            width="1200" 
            height="669" 
            fetchpriority="high" 
            decoding="async" 
          />
          <img 
            class="hero-banner__image" 
            data-src="${maleBannerImg}" 
            alt="Techwear Tactical Gear" 
            id="hero-banner-img-male" 
            width="1200" 
            height="805" 
            loading="lazy" 
            decoding="async" 
          />
          <img 
            class="hero-banner__image" 
            data-src="${cyberBannerImg}" 
            alt="Techwear Cybernetical Gear" 
            id="hero-banner-img-cyber" 
            width="1200" 
            height="805" 
            loading="lazy" 
            decoding="async" 
          />
          <img 
            class="hero-banner__image" 
            data-src="${pilotBannerImg}" 
            alt="Techwear Pilot Gear" 
            id="hero-banner-img-pilot" 
            width="1200" 
            height="805" 
            loading="lazy" 
            decoding="async" 
          />
          <div class="hero-banner__overlay"></div>
        </div>
        
        <div class="hero-banner__content">
          <div class="hero-banner__badge">SYSTEM ONLINE // SEC_LEVEL 1</div>
          
          <h1 class="hero-banner__title glitch" data-text="TACTICAL // CORE GEAR">
            TACTICAL // CORE GEAR
          </h1>
          
          <p class="hero-banner__subtitle">
            Экипировка нового поколения для урбанистического выживания. Высокотехнологичные материалы, модульная совместимость MBS и полная ветро-влагозащита по военным стандартам.
          </p>
          <div class="hero-banner__actions">
            <button class="hero-banner__btn js-open-manifesto js-interactive">
              READ MANIFESTO //
            </button>
            <a href="#catalog-controls" class="hero-banner__btn hero-banner__btn--outline js-interactive">
              VIEW CATALOG //
            </a>
          </div>
        </div>
      </section>

      <div class="manifesto-overlay" id="manifesto-overlay">
        <div class="manifesto-modal">
          <div class="manifesto-header">
            <span>MANIFESTO_DECRYPT // VER_1.09</span>
            <button class="manifesto-close js-close-manifesto js-interactive">CLOSE // X</button>
          </div>
          <div class="manifesto-body">
            <h2>TECHWEAR CORPORATE MANIFESTO //</h2>
            <p><strong>[SYSTEM LOG // 2026]</strong></p>
            <p>Город — это не просто среда обитания. Это цифровая пустыня, полная климатических аномалий и угроз приватности. Мы создаем не просто одежду, мы проектируем индивидуальные защитные оболочки.</p>
            <p>Каждая молния YKK, каждый фастекс Fidlock и каждая нить нейлона Cordura в наших вещах служат одной цели — дать вам превосходство в любых условиях. Будь вы Netrunner в поисках бесшумного проникновения или Recon Unit в боевом рейде, ваша экипировка готова к экстремальным нагрузкам.</p>
            <p><strong>[CORE PROTOCOLS]</strong></p>
            <ul>
              <li><strong>MODULARITY:</strong> Ни одного лишнего шва. Каждый элемент может быть заменен или дополнен другим модулем.</li>
              <li><strong>WEATHER SHIELD:</strong> Полная гидрофобность. Вода скатывается, ветер останавливается, тепло сохраняется.</li>
              <li><strong>CYBER SYNC:</strong> Совместимость с дополненной реальностью и встроенными портавыми системами коммуникации.</li>
            </ul>
            <p style="color: var(--color-accent-blue); margin-top: var(--space-sm);"><em>// LINK TERMINATED. STAY TACTICAL.</em></p>
          </div>
        </div>
      </div>
    `;
  },

  renderFeatures() {
    return `
      <section class="brand-features reveal">
        <div class="brand-feature js-interactive">
          <div class="brand-feature__icon-wrapper">
            <svg class="brand-feature__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h3 class="brand-feature__title">MBS MODULAR SYSTEM //</h3>
          <p class="brand-feature__desc">
            Все модули (сумки, ремни, кобуры) полностью совместимы между собой по стандарту Modular Belt System. Настраивайте экипировку под свои задачи.
          </p>
        </div>

        <div class="brand-feature js-interactive">
          <div class="brand-feature__icon-wrapper">
            <svg class="brand-feature__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h3 class="brand-feature__title">NANOTECH PROTECTION //</h3>
          <p class="brand-feature__desc">
            Использование мембранных тканей Cordura и Gore-Tex обеспечивает 100% защиту от проливного дождя и шквального ветра при сохранении вентиляции.
          </p>
        </div>

        <div class="brand-feature js-interactive">
          <div class="brand-feature__icon-wrapper">
            <svg class="brand-feature__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h3 class="brand-feature__title">SECURE QUANTUM TRANSIT //</h3>
          <p class="brand-feature__desc">
            Все заказы кодируются квантовым шифром и доставляются дронами-курьерами UAV прямо в указанный вами сектор города за считанные минуты.
          </p>
        </div>
      </section>
    `;
  },

  initListeners() {
    const overlay = document.getElementById('manifesto-overlay');
    const openBtns = document.querySelectorAll('.js-open-manifesto');
    const closeBtns = document.querySelectorAll('.js-close-manifesto');

    const models = ['female', 'male', 'cyber', 'pilot'];
    let currentIndex = 0;

    const loadSecondaryImages = () => {
      const lazyImages = document.querySelectorAll('.hero-banner__image[data-src]');
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    };

    if (document.readyState === 'complete') {
      setTimeout(loadSecondaryImages, 1500);
    } else {
      window.addEventListener('load', () => setTimeout(loadSecondaryImages, 1500), { once: true });
    }

    if (window.techwearBannerInterval) {
      clearInterval(window.techwearBannerInterval);
    }

    window.techwearBannerInterval = setInterval(() => {
      const nextModelIndex = (currentIndex + 1) % models.length;
      const nextModel = models[nextModelIndex];
      const nextImgEl = document.getElementById(`hero-banner-img-${nextModel}`);
      if (nextImgEl && nextImgEl.dataset.src) {
        nextImgEl.src = nextImgEl.dataset.src;
        nextImgEl.removeAttribute('data-src');
      }

      models.forEach(model => {
        const el = document.getElementById(`hero-banner-img-${model}`);
        if (el) el.classList.remove('hero-banner__image--active');
      });

      currentIndex = nextModelIndex;

      const nextEl = document.getElementById(`hero-banner-img-${models[currentIndex]}`);
      if (nextEl) nextEl.classList.add('hero-banner__image--active');
    }, 6000);

    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (overlay) {
          overlay.classList.add('manifesto-overlay--open');
          document.body.style.overflow = 'hidden';
          AudioService.playOpen();
        }
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (overlay) {
          overlay.classList.remove('manifesto-overlay--open');
          document.body.style.overflow = '';
          AudioService.playClick();
        }
      });
    });

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('manifesto-overlay--open');
          document.body.style.overflow = '';
          AudioService.playClick();
        }
      });
    }
  }
};
