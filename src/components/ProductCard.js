import '../styles/components/product-card.css';

export const ProductCard = {
  render(product, index = 0) {
    const { id, name, price, image, badge, badgeClass, specs = [] } = product;
    const delay = index * 0.04;

    const specsHtml = specs
      .map(spec => `<span class="product-card__spec">${spec}</span>`)
      .join('');

    const badgeModifier = badgeClass ? `product-card__badge--${badgeClass}` : '';
    const badgeHtml = badge 
      ? `<div class="product-card__badge ${badgeModifier}">${badge}</div>` 
      : '';

    const savedSize = localStorage.getItem(`fit_size_${id}`);
    const fitBadgeHtml = savedSize 
      ? `<div class="product-card__fit-badge">YOUR FIT: ${savedSize}</div>` 
      : '';

    return `
      <article class="product-card" data-id="${id}" style="animation-delay: ${delay}s">
        <div class="product-card__image-wrapper">
          ${badgeHtml}
          <img 
            class="product-card__image" 
            src="${image}" 
            alt="${name}" 
            width="300" 
            height="300" 
            loading="lazy" 
            decoding="async" 
          />
        </div>
        
        <div class="product-card__body">
          <h3 class="product-card__title" title="${name}">${name}</h3>
          
          <div class="product-card__specs">
            ${specsHtml}
          </div>

          ${fitBadgeHtml}

          <button class="product-card__scan-link js-fit-scan" data-id="${id}" data-name="${name}">
            FIT SCANNER //
          </button>
          
          <div class="product-card__footer">
            <span class="product-card__price">${price}</span>
            <button 
              class="product-card__btn js-add-to-cart" 
              data-id="${id}"
              aria-label="Добавить ${name} в корзину"
            >
              <span>ADD TO GEAR</span>
              <svg class="product-card__btn-icon" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }
};
