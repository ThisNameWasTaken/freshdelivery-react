import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/http';
import { i18n } from 'next-i18next';
import { useQuery } from 'react-query';

export const fetchSearchedProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const language = i18n?.language || 'ro';
  const text = _params.text.toLowerCase();
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
  return data.filter((item: Product) => {
    return item.name[language].toLowerCase().includes(text);
  });
};

export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.SEARCH, options],
    fetchSearchedProducts
  );
};
