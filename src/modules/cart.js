/**
 * Модуль управления состоянием корзины (State Management)
 * Реализует паттерн Single Source of Truth (Единый источник истины).
 * Синхронизирует состояние с LocalStorage и рассылает события при изменениях.
 */

const STORAGE_KEY = 'techwear_cart_gear';

// Внутреннее (приватное) состояние корзины
let state = {
  items: []
};

/**
 * Загрузка состояния из LocalStorage при инициализации
 */
const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      state.items = JSON.parse(raw);
    }
  } catch (error) {
    console.error('❌ [Cart State] Failed to load cart from LocalStorage:', error);
    state.items = [];
  }
};

/**
 * Сохранение состояния в LocalStorage
 */
const saveState = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  } catch (error) {
    console.error('❌ [Cart State] Failed to save cart to LocalStorage:', error);
  }
};

/**
 * Уведомление приложения об изменении состояния корзины
 */
const notifyUpdate = () => {
  const event = new CustomEvent('cart-updated', {
    detail: {
      items: state.items,
      count: CartState.getCount(),
      total: CartState.getTotal()
    }
  });
  document.dispatchEvent(event);
};

export const CartState = {
  /**
   * Инициализация стейта (вызывается на старте приложения)
   */
  init() {
    loadState();
    console.log('📦 [Cart State] Initialized with items:', state.items);
    notifyUpdate(); // Рассылаем стартовое состояние компонентам
  },

  /**
   * Получить список товаров (возвращает копию для предотвращения прямых мутаций)
   * @returns {Array}
   */
  getItems() {
    return state.items.map(item => ({ ...item }));
  },

  /**
   * Добавить товар в корзину
   * @param {Object} product
   */
  addToCart(product) {
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      state.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    saveState();
    notifyUpdate();
    console.log(`📥 [Cart State] Item added: ${product.name}. Current count: ${this.getCount()}`);
  },

  /**
   * Полное удаление товара из корзины
   * @param {string} productId
   */
  removeFromCart(productId) {
    state.items = state.items.filter(item => item.id !== productId);
    saveState();
    notifyUpdate();
    console.log(`📤 [Cart State] Item removed ID: ${productId}. Current count: ${this.getCount()}`);
  },

  /**
   * Обновление количества конкретного товара
   * @param {string} productId
   * @param {number} quantity
   */
  updateQuantity(productId, quantity) {
    const item = state.items.find(item => item.id === productId);
    
    if (item) {
      item.quantity = parseInt(quantity, 10);
      
      // Если количество сбросили в 0 или меньше, удаляем товар полностью
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
      
      saveState();
      notifyUpdate();
      console.log(`⚙️ [Cart State] Quantity updated for ID: ${productId} to ${item.quantity}`);
    }
  },

  /**
   * Очистить всю корзину
   */
  clearCart() {
    state.items = [];
    saveState();
    notifyUpdate();
    console.log('🧹 [Cart State] Cart cleared.');
  },

  /**
   * Получить общее количество товаров в корзине
   * @returns {number}
   */
  getCount() {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  /**
   * Получить итоговую сумму
   * @returns {number}
   */
  getTotal() {
    return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
};
