const STORAGE_KEY = 'techwear_cart_gear';

let state = {
  items: []
};

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      state.items = JSON.parse(raw);
    }
  } catch (error) {
    state.items = [];
  }
};

const saveState = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  } catch (error) {}
};

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
  init() {
    loadState();
    notifyUpdate();
  },

  getItems() {
    return state.items.map(item => ({ ...item }));
  },

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
  },

  removeFromCart(productId) {
    state.items = state.items.filter(item => item.id !== productId);
    saveState();
    notifyUpdate();
  },

  updateQuantity(productId, quantity) {
    const item = state.items.find(item => item.id === productId);
    
    if (item) {
      item.quantity = parseInt(quantity, 10);
      
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
      
      saveState();
      notifyUpdate();
    }
  },

  clearCart() {
    state.items = [];
    saveState();
    notifyUpdate();
  },

  getCount() {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotal() {
    return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
};
