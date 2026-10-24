import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/variables.css';
import './styles/base.css';
import './styles/components/header.css';
import './styles/components/about-banner.css';
import './styles/components/catalog-filter.css';
import './styles/components/product-card.css';
import './styles/components/product-grid.css';
import './styles/components/cart-drawer.css';
import './styles/components/cart-item.css';
import './styles/components/fit-scanner.css';
import './styles/components/checkout-terminal.css';
import './styles/components/info-sections.css';
import './styles/components/footer.css';
import './styles/components/toast.css';

import { ThemeProvider } from './context/ThemeContext';
import { ProfileProvider } from './context/ProfileContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { App } from './App';

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker
      .register(swUrl, { scope: import.meta.env.BASE_URL })
      .catch((err) => {
        console.warn('SW registration warning:', err);
      });
  }
};

registerServiceWorker();

const rootElement = document.getElementById('root') || document.getElementById('app');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <ProfileProvider>
          <ToastProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ToastProvider>
        </ProfileProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
