export interface IProductItem {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  description?: string;
  brand?: string;
  stock?: string;
}

export interface ICategories {
  slug: string;
  name: string;
  url: string;
}

export interface ISelectInput {
  label: string,
  value: string,
}

// Re-export navigation types
export type { RootStackParamList } from './navigation';

