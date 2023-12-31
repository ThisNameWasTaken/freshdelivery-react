import { QueryKey } from 'react-query';

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};

export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};

export type Category = {
  id: number | string;
  name: { [key: string]: string };
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  children?: [Category];
  products?: Product[];
  productCount?: number;
  [key: string]: unknown;
};

export type Tag = {
  id: string | number;
  name: { [key: string]: string };
  slug: string;
};

export type Product = {
  id: number | string;
  name: { [key: string]: string };
  slug: string;
  price: number;
  quantity: number;
  sold: number;
  unit: string;
  sale_price?: number;
  min_price?: number;
  max_price?: number;
  image: Attachment;
  sku?: string;
  gallery?: Attachment[];
  category?: Category;
  tag?: Tag[];
  meta?: any[];
  description?: string;
  variations?: object;
  [key: string]: unknown;
};

export type Review = {
  id: string;
  rating: number;
  title?: string;
  comment?: string;
  userId: number;
  productId: number;
};

export type Address = {
  id: string;
  title: string;
  default: boolean;
  address: {
    lat: number;
    lng: number;
    formattedAddress: string;
  };
};

export type OrderItem = {
  id: number | string;
  name: { [key: string]: string };
  price: number;
  quantity: number;
};

export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};
