import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { CartProduct } from "../types";
import { fetchCartProducts } from "../APIs";

export function useGetCartProducts(token: string | null) {
  return useQuery<CartProduct[]>({
    queryKey: ["cartProducts"],
    queryFn: () => fetchCartProducts(token!),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });
}
