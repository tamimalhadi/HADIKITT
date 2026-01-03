
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: 'New' | 'Popular';
}

export type View = 'home' | 'product' | 'checkout' | 'success';

export interface CheckoutData {
  name: string;
  phone: string;
  address: string;
  size: string;
  product: Product;
}
