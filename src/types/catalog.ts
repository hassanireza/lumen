export interface Brand {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  product_count: number;
}

export interface ProductImage {
  id: number;
  url: string;
  alt_text: string;
  is_primary: boolean;
  order: number;
}

export interface ProductListItem {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  price: string;
  compare_price: string | null;
  discount_percentage: number;
  brand: Brand;
  category: Category;
  primary_image: string | null;
  in_stock: boolean;
  is_featured: boolean;
}

export interface ProductDetail extends Omit<ProductListItem, "primary_image"> {
  description: string;
  sku: string;
  stock: number;
  images: ProductImage[];
  specifications: Record<string, string>;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
