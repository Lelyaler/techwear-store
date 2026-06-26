import '../styles/components/product-card.css';

/**
 * UI Компонент: ProductCard (Карточка товара)
 * Презентационный компонент для отображения отдельного товара в каталоге.
 */
export const ProductCard = {
  /**
   * Генерация HTML-разметки карточки товара
   * @param {Object} product - объект с данными товара
   * @param {string|number} product.id - уникальный ID товара
   * @param {string} product.name - название товара
   * @param {number} product.price - стоимость товара
   * @param {string} product.image - путь к картинке товара
   * @param {string} [product.badge] - текст бейджа (например, "SHELL")
   * @param {string} [product.badgeClass] - цвет бейджа ("blue", "pink", "green")
   * @param {string[]} [product.specs] - массив технических характеристик
   * @returns {string} HTML string
   */
  render(product) {
    const { id, name, price, image, badge, badgeClass, specs = [] } = product;

    // Генерируем HTML для характеристик
    const specsHtml = specs
      .map(spec => `<span class="product-card__spec">${spec}</span>`)
      .join('');

    // Вычисляем класс для бейджа
    const badgeModifier = badgeClass ? `product-card__badge--${badgeClass}` : '';
    const badgeHtml = badge 
      ? `<div class="product-card__badge ${badgeModifier}">${badge}</div>` 
      : '';

    return `
      <article class="product-card" data-id="${id}">
        <!-- Обертка для изображения с бейджем -->
        <div class="product-card__image-wrapper">
          ${badgeHtml}
          
          <!-- Переключатель 3D-режима -->
          <button 
            class="product-card__3d-btn js-btn-3d" 
            data-id="${id}" 
            title="Интерактивный 3D-просмотр"
            aria-label="Интерактивный 3D-просмотр"
          >
            3D //
          </button>
          
          <img 
            class="product-card__image" 
            src="${image}" 
            alt="${name}" 
            loading="lazy" 
          />
          
          <!-- WebGL Холст для Three.js -->
          <canvas class="product-card__canvas" id="canvas-${id}"></canvas>
        </div>
        
        <!-- Контентная часть карточки -->
        <div class="product-card__body">
          <h3 class="product-card__title" title="${name}">${name}</h3>
          
          <!-- Теги характеристик -->
          <div class="product-card__specs">
            ${specsHtml}
          </div>
          
          <!-- Футер карточки (Цена + Добавить в корзину) -->
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
