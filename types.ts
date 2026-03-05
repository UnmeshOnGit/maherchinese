
export interface Variation {
  type: string;
  price: number;
}

export interface Dish {
  id: number | string;
  name: string;
  description: string;
  category: string;
  veg: boolean;
  image: string;
  variations: Variation[];
  available: boolean;
  rating?: number;
  votes?: number;
}

export interface CartItem extends Dish {
  selectedVariation: Variation;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryCharge: number;
  date: string;
  timestamp: number;
  status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
  userData?: UserData;
  paymentMethod?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface UserData {
  name: string;
  address: string;
  phone: string;
  area?: string;
}
