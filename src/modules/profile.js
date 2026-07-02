/**
 * Модуль управления состоянием профиля пользователя (Cyber Profile & Wallet)
 * Синхронизирует профиль с LocalStorage.
 */

const STORAGE_KEY = 'techwear_cyber_profile';

let state = {
  faction: 'NETRUNNER', // NETRUNNER, CYBORG, RECON, OPERATIVE
  credits: 100,
  decryptedCodes: [],
  orders: [],
  xp: 0,
  level: 1
};

const loadProfile = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      state = { ...state, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('❌ [Profile State] Failed to load profile:', error);
  }
};

const saveProfile = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('❌ [Profile State] Failed to save profile:', error);
  }
};

export const ProfileState = {
  init() {
    loadProfile();
    console.log('👤 [Profile State] Loaded profile:', state);
  },

  getFaction() {
    return state.faction;
  },

  setFaction(faction) {
    state.faction = faction;
    saveProfile();
    document.dispatchEvent(new CustomEvent('profile-updated', { detail: state }));
  },

  getXP() {
    return state.xp || 0;
  },

  getLevel() {
    return state.level || 1;
  },

  addXP(amount) {
    if (typeof state.xp === 'undefined') state.xp = 0;
    if (typeof state.level === 'undefined') state.level = 1;

    state.xp += amount;
    let leveledUp = false;
    let oldLevel = state.level;

    let xpNeeded = state.level * 100;
    while (state.xp >= xpNeeded) {
      state.xp -= xpNeeded;
      state.level++;
      leveledUp = true;
      xpNeeded = state.level * 100;
    }

    saveProfile();
    document.dispatchEvent(new CustomEvent('profile-updated', { detail: state }));

    if (leveledUp) {
      document.dispatchEvent(new CustomEvent('level-up', { 
        detail: { level: state.level, oldLevel } 
      }));
    }
  },

  getCredits() {
    return state.credits;
  },

  addCredits(amount) {
    state.credits += amount;
    saveProfile();
    document.dispatchEvent(new CustomEvent('profile-updated', { detail: state }));
  },

  spendCredits(amount) {
    if (state.credits >= amount) {
      state.credits -= amount;
      saveProfile();
      document.dispatchEvent(new CustomEvent('profile-updated', { detail: state }));
      return true;
    }
    return false;
  },

  getDecryptedCodes() {
    return state.decryptedCodes;
  },

  addDecryptedCode(code) {
    if (!state.decryptedCodes.includes(code)) {
      state.decryptedCodes.push(code);
      saveProfile();
      document.dispatchEvent(new CustomEvent('profile-updated', { detail: state }));
    }
  },

  getOrders() {
    return [...state.orders];
  },

  addOrder(orderId, total, itemsCount, skipCashback = false) {
    state.orders.unshift({
      id: orderId,
      date: new Date().toLocaleDateString('ru-RU'),
      total: total,
      itemsCount: itemsCount
    });
    
    let cashback = 0;
    if (!skipCashback) {
      // За покупку начисляем 10% кэшбэка в кредитах
      cashback = Math.round(total * 0.1);
      state.credits += cashback;
    }
    
    // Начисляем 100 XP за покупку
    this.addXP(100);

    saveProfile();
    document.dispatchEvent(new CustomEvent('profile-updated', { detail: state }));
    return cashback;
  }
};
