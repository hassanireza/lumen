import { useQuery } from "@tanstack/react-query";
import { fetchProduct, fetchProducts } from "../api/client";

export function useProducts(params?: { search?: string; ordering?: string; featured?: boolean }) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    staleTime: 60_000,
  });
}

export function useProduct(slug: string | undefined) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProduct(slug as string),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });
}
