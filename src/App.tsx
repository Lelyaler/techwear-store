import React, { useState, useMemo, lazy, Suspense } from 'react';
import { ProductCategory } from './types';
import { PRODUCTS } from './data/products';
import { AudioService } from './services/audio';

import { Header } from './components/Header';
import { AboutBanner } from './components/AboutBanner';
import { CatalogFilter } from './components/CatalogFilter';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { InfoSections } from './components/InfoSections';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';

const FitScannerModal = lazy(() =>
  import('./components/FitScannerModal').then((m) => ({ default: m.FitScannerModal }))
);
const CheckoutTerminalModal = lazy(() =>
  import('./components/CheckoutTerminalModal').then((m) => ({ default: m.CheckoutTerminalModal }))
);

export const App: React.FC = () => {
  const [isFitScannerOpen, setIsFitScannerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod) => {
      if (selectedCategory !== 'ALL' && prod.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesSpecs = prod.specs.some((s) => s.toLowerCase().includes(q));
        const matchesDesc = prod.description.toLowerCase().includes(q);
        const matchesMaterial = prod.material.toLowerCase().includes(q);
        if (!matchesName && !matchesSpecs && !matchesDesc && !matchesMaterial) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="app-root" onClick={() => AudioService.startAmbient()}>
      <div className="scanline-overlay" />

      <Header
        onOpenFitScanner={() => setIsFitScannerOpen(true)}
      />

      <main className="main container">
        <AboutBanner />

        <section style={{ marginTop: 'var(--space-md)' }}>
          <CatalogFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {filteredProducts.length === 0 ? (
            <div className="catalog-empty">
              <div className="catalog-empty__title">
                ТОВАРЫ НЕ НАЙДЕНЫ //
              </div>
              <div className="catalog-empty__desc">
                Попробуйте изменить поисковый запрос или сбросить фильтры.
              </div>
              <button
                type="button"
                onClick={() => {
                  AudioService.playClick();
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                  setSortBy('default');
                }}
                className="catalog-empty__btn"
              >
                СБРОСИТЬ ФИЛЬТРЫ //
              </button>
            </div>
          ) : (
            <div className="product-grid" id="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenFitScanner={() => setIsFitScannerOpen(true)}
                />
              ))}
            </div>
          )}
        </section>

        <InfoSections />
      </main>

      <Footer />

      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />

      <Suspense fallback={null}>
        {isFitScannerOpen && (
          <FitScannerModal
            isOpen={isFitScannerOpen}
            onClose={() => setIsFitScannerOpen(false)}
          />
        )}

        {isCheckoutOpen && (
          <CheckoutTerminalModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
          />
        )}
      </Suspense>

      <ToastContainer />
    </div>
  );
};
