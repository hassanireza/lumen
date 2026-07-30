import axios from "axios";
import type { Paginated, ProductDetail, ProductListItem } from "../types/catalog";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const client = axios.create({ baseURL: API_BASE_URL });

export async function fetchProducts(params?: {
  search?: string;
  ordering?: string;
  featured?: boolean;
}): Promise<ProductListItem[]> {
  const { data } = await client.get<Paginated<ProductListItem>>("/products/", { params });
  return data.results;
}

export async function fetchProduct(slug: string): Promise<ProductDetail> {
  const { data } = await client.get<ProductDetail>(`/products/${slug}/`);
  return data;
}

export default client;
