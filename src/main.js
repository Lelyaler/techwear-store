import './styles/variables.css';
import './styles/base.css';
import './styles/components/product-grid.css';
import { Header } from './components/Header.js';
import { ProductCard } from './components/ProductCard.js';
import { CartDrawer } from './components/CartDrawer.js';

// Импортируем оптимизированные изображения товаров
import jacketImg from './assets/jacket.jpg';
import chestRigImg from './assets/chest-rig.jpg';
import backpackImg from './assets/backpack.jpg';

// Локальная база данных товаров
const PRODUCTS = [
  {
    id: 'mod-jacket-x1',
    name: 'X-1 Shadow Shell Jacket',
    price: 289,
    image: jacketImg,
    badge: 'Shell Module',
    badgeClass: 'blue',
    specs: ['Waterproof', 'Cordura Shell', '3 Attachments']
  },
  {
    id: 'mod-rig-c3',
    name: 'C-3 Cyber Rig Harness',
    price: 145,
    image: chestRigImg,
    badge: 'Core Module',
    badgeClass: 'pink',
    specs: ['Tactical straps', 'Molle Grid', 'Quick-Release']
  },
  {
    id: 'mod-backpack-b5',
    name: 'B-5 Modular Pack V2',
    price: 195,
    image: backpackImg,
    badge: 'Cargo Module',
    badgeClass: 'green',
    specs: ['Waterproof zip', '25L Capacity', 'Modular expansion']
  }
];

// Точка входа в систему Techwear & Modular Gear
const initializeApp = () => {
  const appElement = document.querySelector('#app');
  
  if (!appElement) return;

  // Генерируем разметку для всех товаров
  const productsHtml = PRODUCTS.map(product => ProductCard.render(product)).join('');

  appElement.innerHTML = `
    <!-- Эффект CRT-сканирования -->
    <div class="scanline-overlay"></div>
    
    <div class="app">
      <!-- Шапка -->
      ${Header.render(0)}
      
      <!-- Основной контент -->
      <main class="main">
        <!-- Блок интро каталога -->
        <section style="margin-bottom: var(--space-lg); padding-top: var(--space-md);">
          <h2 style="
            font-size: 1.5rem; 
            letter-spacing: 0.12em; 
            margin-bottom: var(--space-xs); 
            color: var(--color-text-primary);
          ">
            TACTICAL // GEAR
          </h2>
          <p style="
            color: var(--color-text-secondary); 
            max-width: 600px; 
            font-size: 0.85rem; 
            line-height: 1.6;
          ">
            Модульная городская экипировка. Каждый элемент спроектирован с учетом максимальной утилитарности и совместимости по стандартам Modular Belt System.
          </p>
        </section>

        <!-- Сетка каталога -->
        <section class="product-grid">
          ${productsHtml}
        </section>
      </main>

      <!-- Выдвижная корзина (Cart Drawer) -->
      ${CartDrawer.render()}
    </div>
  `;

  // Инициализируем слушатели событий для компонентов
  Header.initListeners();
  CartDrawer.initListeners();

  // Делегирование события клика для добавления товара в корзину
  appElement.addEventListener('click', (event) => {
    const addToCartBtn = event.target.closest('.js-add-to-cart');
    
    if (addToCartBtn) {
      const productId = addToCartBtn.dataset.id;
      const product = PRODUCTS.find(p => p.id === productId);
      
      if (product) {
        console.log(`➕ [App] Action: Add to gear: ${product.name} (ID: ${productId})`);
        
        // Временная интерактивная симуляция: увеличиваем счетчик в шапке
        const cartCountEl = document.querySelector('#header-cart-count');
        if (cartCountEl) {
          const currentCount = parseInt(cartCountEl.textContent) || 0;
          Header.updateCartCount(currentCount + 1);
        }
      }
    }
  });

  // Локальные отладочные сообщения глобальных событий
  document.addEventListener('toggle-cart', () => {
    console.log('⚡ [App Event] toggle-cart event processed by CartDrawer.');
  });

  document.addEventListener('toggle-search', () => {
    console.log('⚡ [App Event] toggle-search received. No search modal implemented yet.');
  });

  console.log('👾 [Techwear OS] System initialized. Shell and CartDrawer loaded.');
};

document.addEventListener('DOMContentLoaded', initializeApp);
