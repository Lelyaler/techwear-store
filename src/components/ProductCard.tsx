import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { AudioService } from '../services/audio';

interface ProductCardProps {
  product: Product;
  onOpenFitScanner: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenFitScanner }) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'STD');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const badgeClass =
    product.badgeClass === 'pink'
      ? 'product-card__badge--pink'
      : product.badgeClass === 'green'
      ? 'product-card__badge--green'
      : 'product-card__badge--blue';

  return (
    <article
      className="product-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      data-id={product.id}
    >
      <div className="product-card__image-wrapper">
        <span className={`product-card__badge ${badgeClass}`}>{product.badge}</span>
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width="400"
          height="533"
        />
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title" title={product.name}>
          {product.name}
        </h3>

        <div className="product-card__specs">
          {product.specs.map((spec, idx) => (
            <span key={idx} className="product-card__spec">
              {spec}
            </span>
          ))}
        </div>

        {product.sizes.length > 1 && (
          <div className="product-card__size-row">
            <div className="product-card__sizes">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    AudioService.playClick();
                    setSelectedSize(sz);
                  }}
                  className={`product-card__size-btn ${selectedSize === sz ? 'product-card__size-btn--active' : ''}`}
                >
                  {sz}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                AudioService.playClick();
                onOpenFitScanner();
              }}
              className="product-card__fit-link"
            >
              FIT ASSISTANT ?
            </button>
          </div>
        )}

        <div className="product-card__desc-wrapper">
          <p className="product-card__desc" title={product.description}>
            {product.description}
          </p>
          <div className="product-card__material-info" style={{ marginTop: '4px', fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
            ТКАНЬ: {product.material}
          </div>
        </div>

        <div className="product-card__footer">
          <div className="product-card__price">{product.price}</div>

          <button
            className="product-card__btn"
            onClick={() => addItem(product, selectedSize)}
            aria-label={`Добавить ${product.name} в корзину`}
          >
            <svg className="product-card__btn-icon" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            В КОРЗИНУ
          </button>
        </div>
      </div>
    </article>
  );
};
