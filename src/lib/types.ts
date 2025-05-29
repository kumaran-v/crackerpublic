
// Product and cart related types
export type ProductCategory = 
  | "flower-pots" 
  | "ground-chakkars" 
  | "one-sound-cracker"
  | "atom-bomb"
  | "bijili-cracker"
  | "rockets" 
  | "fancy-shots" 
  | "fancy-aerial-shots"
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
}

// Google Sheets related types (updated to match Python script format)
export interface OrderData {
  timestamp: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  orderItems: string;
  totalAmount: number;
  orderStatus: string;
}

export interface PageVisitData {
  timestamp: string;
  pageUrl: string;
  referrer: string | null;
  // Note: IP address is not included as it's not easily accessible from client-side
  // Instead, we use page URL and referrer as identifiers
}
