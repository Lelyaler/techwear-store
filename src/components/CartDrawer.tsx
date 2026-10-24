import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useProfile } from '../context/ProfileContext';
import { AudioService } from '../services/audio';
import { PRODUCTS } from '../data/products';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    appliedPromo,
    discountPercent,
    applyPromo,
    removePromo,
    useCredits,
    toggleUseCredits,
    subtotal,
    discountAmount,
    creditsDiscount,
    shipping,
    total
  } = useCart();

  const { profile } = useProfile();
  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyPromo(promoInput);
    if (ok) setPromoInput('');
  };

  const handleProceedToCheckout = () => {
    AudioService.playClick();
    closeDrawer();
    onOpenCheckout();
  };

  return (
    <aside
      className={`cart-drawer ${isDrawerOpen ? 'cart-drawer--open' : ''}`}
      aria-hidden={!isDrawerOpen}
    >
      <div className="cart-drawer__overlay" onClick={closeDrawer} />

      <div className="cart-drawer__panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer__header">
          <span className="cart-drawer__title">TACTICAL LOADOUT //</span>
          <button className="cart-drawer__close" onClick={closeDrawer} aria-label="Close Loadout Drawer">
            CLOSE // X
          </button>
        </div>

        <div className="cart-drawer__content">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <svg className="cart-drawer__empty-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
              </svg>
              <div>NO MODULES ATTACHED</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', maxWidth: '240px' }}>
                Select modules from the catalog to configure your tactical loadout.
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item__img-wrapper">
                  <img
                    className="cart-item__img"
                    src={item.product.image}
                    alt={item.product.name}
                    width={54}
                    height={54}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const live = PRODUCTS.find((p) => p.id === item.product?.id);
                      if (live && target.src !== live.image) {
                        target.src = live.image;
                      }
                    }}
                  />
                </div>

                <div className="cart-item__body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div className="cart-item__title" title={item.product.name}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                        SIZE: [{item.selectedSize}]
                      </div>
                    </div>
                    <button
                      className="cart-item__remove-btn"
                      onClick={() => removeItem(item.id)}
                      title="Remove module"
                    >
                      <svg className="cart-item__remove-icon" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  <div className="cart-item__info">
                    <div className="cart-item__price">{item.product.price * item.quantity}</div>

                    <div className="cart-item__controls">
                      <button
                        className="cart-item__btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="cart-item__qty">{item.quantity}</span>
                      <button
                        className="cart-item__btn"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <form
              onSubmit={handleApplyPromo}
              style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}
            >
              <input
                type="text"
                placeholder="PROMO CIPHER (e.g. TECH20)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(6, 7, 9, 0.8)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  padding: '6px 10px',
                  borderRadius: '2px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--color-accent-blue)',
                  color: 'var(--color-bg-main)',
                  border: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  padding: '6px 12px',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                APPLY
              </button>
            </form>

            {appliedPromo && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(0, 255, 102, 0.08)',
                  border: '1px solid rgba(0, 255, 102, 0.3)',
                  padding: '4px 8px',
                  marginBottom: '10px',
                  fontSize: '0.65rem',
                  fontFamily: 'monospace',
                  color: 'var(--color-accent-green)'
                }}
              >
                <span>CIPHER [{appliedPromo}]: -{discountPercent}%</span>
                <button
                  type="button"
                  onClick={removePromo}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-accent-pink)',
                    cursor: 'pointer',
                    fontSize: '0.65rem'
                  }}
                >
                  REMOVE
                </button>
              </div>
            )}

            {profile.credits > 0 && (
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={useCredits}
                  onChange={toggleUseCredits}
                  style={{ accentColor: 'var(--color-accent-blue)' }}
                />
                <span>Redeem Cyber Credits (Available: {profile.credits} ₵)</span>
              </label>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                <span>SUBTOTAL:</span>
                <span>${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-accent-green)' }}>
                  <span>PROMO DISCOUNT:</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              {creditsDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-accent-blue)' }}>
                  <span>CREDITS REDEEMED:</span>
                  <span>-${creditsDiscount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                <span>UAV DISPATCH:</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
            </div>

            <div className="cart-drawer__total">
              <span className="cart-drawer__total-label">TOTAL LOADOUT COST:</span>
              <span className="cart-drawer__total-price">{total}</span>
            </div>

            <button
              className="cart-drawer__checkout-btn"
              onClick={handleProceedToCheckout}
              disabled={items.length === 0}
            >
              PROCEED TO TERMINAL //
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
