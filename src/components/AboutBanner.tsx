import React, { useState, useEffect } from 'react';
import femaleBannerImg from '../assets/techwear-banner.webp';
import maleBannerImg from '../assets/techwear-male-banner.webp';
import cyberBannerImg from '../assets/techwear-cyber-banner.webp';
import pilotBannerImg from '../assets/techwear-pilot-banner.webp';
import { AudioService } from '../services/audio';

const HERO_IMAGES = [
  { id: 'female', src: femaleBannerImg, alt: 'Techwear Tactical Gear' },
  { id: 'male', src: maleBannerImg, alt: 'Urban Techwear Outfits' },
  { id: 'cyber', src: cyberBannerImg, alt: 'Modular Loadout Shells' },
  { id: 'pilot', src: pilotBannerImg, alt: 'Aviation Techwear Apparel' }
];

export const AboutBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(() => new Set([0]));
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % HERO_IMAGES.length;
        setLoadedSlides((loaded) => {
          if (loaded.has(next)) return loaded;
          const copy = new Set(loaded);
          copy.add(next);
          return copy;
        });
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const openManifesto = () => {
    AudioService.playClick();
    setIsManifestoOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeManifesto = () => {
    AudioService.playClick();
    setIsManifestoOpen(false);
    document.body.style.overflow = '';
  };

  const scrollToCatalog = (e: React.MouseEvent) => {
    e.preventDefault();
    AudioService.playClick();
    const el = document.getElementById('catalog-controls');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="hero-banner" id="about-section">
        <div className="hero-banner__image-wrapper">
          {HERO_IMAGES.map((img, index) => {
            if (!loadedSlides.has(index)) return null;
            if (index === 0) {
              return (
                <picture key={img.id}>
                  <source
                    media="(max-width: 640px)"
                    srcSet="./images/techwear-banner-mobile.webp"
                    type="image/webp"
                    width="540"
                    height="301"
                  />
                  <img
                    className={`hero-banner__image ${index === currentSlide ? 'hero-banner__image--active' : ''}`}
                    src="./images/techwear-banner.webp"
                    alt={img.alt}
                    width={1200}
                    height={669}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              );
            }
            return (
              <img
                key={img.id}
                className={`hero-banner__image ${index === currentSlide ? 'hero-banner__image--active' : ''}`}
                src={img.src}
                alt={img.alt}
                width={1200}
                height={700}
                fetchPriority="low"
                loading="lazy"
                decoding="async"
              />
            );
          })}
          <div className="hero-banner__overlay" />
        </div>

        <div className="hero-banner__content">
          <div className="hero-banner__badge">ENGINEERED PERFORMANCE // 2026</div>

          <h1 className="hero-banner__title">TACTICAL // CORE GEAR</h1>

          <p className="hero-banner__subtitle">
            Экипировка нового поколения для урбанистической среды. Высокотехнологичные материалы,
            модульная совместимость Molle и надежная ветро-влагозащита по полевым стандартам.
          </p>

          <div className="hero-banner__actions">
            <button className="hero-banner__btn" onClick={openManifesto}>
              READ MANIFESTO //
            </button>
            <a
              href="#catalog-controls"
              className="hero-banner__btn hero-banner__btn--outline"
              onClick={scrollToCatalog}
            >
              VIEW CATALOG //
            </a>
          </div>
        </div>
      </section>

      <section className="brand-features" id="tech-specs">
        <div className="brand-feature">
          <div className="brand-feature__icon-wrapper">
            <svg className="brand-feature__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h3 className="brand-feature__title">TACTICAL MODULARITY //</h3>
          <p className="brand-feature__desc">
            Все модули (сумки, ремни, риги) совместимы между собой по стандарту Molle и быстросбросам Fidlock.
            Конфигурируйте выкладку снаряжения под индивидуальные городские задачи.
          </p>
        </div>

        <div className="brand-feature">
          <div className="brand-feature__icon-wrapper">
            <svg className="brand-feature__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3 className="brand-feature__title">NANOTECH PROTECTION //</h3>
          <p className="brand-feature__desc">
            Мембранные ткани Cordura 1000D, Schoeller и eVent обеспечивают 100% барьер от проливного дождя
            и штормового ветра с сохранением паропроницаемости.
          </p>
        </div>

        <div className="brand-feature">
          <div className="brand-feature__icon-wrapper">
            <svg className="brand-feature__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h3 className="brand-feature__title">AUTONOMOUS TRANSIT //</h3>
          <p className="brand-feature__desc">
            Экспресс-доставка заказов через UAV-дроны и защищенную сеть распределительных узлов прямо в
            ваш сектор города за 24–48 часов.
          </p>
        </div>
      </section>

      <div
        className={`manifesto-overlay ${isManifestoOpen ? 'manifesto-overlay--open' : ''}`}
        onClick={closeManifesto}
      >
        <div className="manifesto-modal" onClick={(e) => e.stopPropagation()}>
          <div className="manifesto-header">
            <span>MANIFESTO_DECRYPT // VER_2.4</span>
            <button className="manifesto-close" onClick={closeManifesto}>
              CLOSE // X
            </button>
          </div>
          <div className="manifesto-body">
            <h2>TECHWEAR BRAND MANIFESTO //</h2>
            <p><strong>[DESIGN SYSTEM // 2026]</strong></p>
            <p>
              Городская среда — это постоянный вызов: резкие климатические перепады, дожди, перегруженная
              транспортная инфраструктура и динамичный ритм. Мы создаем не просто одежду, мы проектируем
              индивидуальные защитные комплексы.
            </p>
            <p>
              Каждая водостойкая молния YKK Aquaguard, магнитный замок Fidlock и нить высокопрочного нейлона
              Cordura служат одной цели — обеспечить максимальную функциональность и эргономику.
            </p>
            <p><strong>[КЛЮЧЕВЫЕ ПРИНЦИПЫ]</strong></p>
            <ul>
              <li><strong>МОДУЛЬНОСТЬ:</strong> Съемные подсумки, регулируемые стропы и крепления под снаряжение.</li>
              <li><strong>ЗАЩИТА ОТ СТИХИЙ:</strong> Гидрофобные мембраны с показателями 20,000мм водяного столба.</li>
              <li><strong>АНАТОМИЧЕСКИЙ КРОЙ:</strong> Сегментированные колени и плечевые швы для свободы движения.</li>
            </ul>
            <p style={{ color: 'var(--color-accent-blue)', marginTop: 'var(--space-sm)' }}>
              <em>// END OF TRANSMISSION. STAY FUNCTIONAL.</em>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
