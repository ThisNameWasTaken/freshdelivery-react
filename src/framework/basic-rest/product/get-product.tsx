import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/http';
import { useQuery } from 'react-query';

export const fetchProduct = async (_slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.PRODUCTS}`);
  console.log(
    { data },
    data.find((product: Product) => product.slug === _slug)
  );
  return data.find((product: Product) => product.slug === _slug.toLowerCase());
};
export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCTS, slug], () =>
    fetchProduct(slug)
  );
};
