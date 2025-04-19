
// Product and cart related types
export type ProductCategory = 
  | "flower-pots" 
  | "ground-chakkars" 
  | "rockets" 
  | "fancy-shots" 
  | "gift-boxes" 
  | "sparklers" 
  | "all";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  inStock: boolean;
  featured?: boolean;
  rating?: number;
  tags?: string[];
  brand?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
}
