export type ProductCategory = 'ALL' | 'SHELL' | 'CORE' | 'CARGO' | 'BLACKMARKET';

export type ProductBadgeClass = 'blue' | 'pink' | 'green';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'SHELL' | 'CORE' | 'CARGO' | 'BLACKMARKET';
  badge: string;
  badgeClass: ProductBadgeClass;
  specs: string[];
  description: string;
  material: string;
  sizes: string[];
}

export interface CartItem {
  id: string; // product.id + '-' + selectedSize
  product: Product;
  quantity: number;
  selectedSize: string;
}

export type UserFaction = 'RECON' | 'NETRUNNER' | 'CYBORG' | 'OPERATIVE';

export interface FitProfile {
  heightCm: number;
  weightKg: number;
  footLengthCm: number;
  palmWidthCm: number;
  recommendedSize: string;
  calculatedAt: string;
}

export interface UserProfile {
  callsign: string;
  faction: UserFaction;
  credits: number;
  level: number;
  appliedPromo: string | null;
  fitProfile?: FitProfile;
}

export type ThemeMode = 'default' | 'green' | 'pink' | 'cyber';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type?: 'blue' | 'pink' | 'green' | 'error';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
}
