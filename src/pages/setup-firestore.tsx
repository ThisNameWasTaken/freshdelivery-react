import Layout from '@components/layout/layout';
import Container from '@components/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/http';
import {
  fetchProducts,
  useProductsQuery,
} from '@framework/product/get-all-products';
import {
  fetchCategories,
  useCategoriesQuery,
} from '@framework/category/get-all-categories';
import { LIMITS } from '@framework/utils/http';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QueryClient } from 'react-query';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyAjw59aH8-8wwLb_yNfybAtLFbIMgZDrOM',
  authDomain: 'freshdelivery-586d6.firebaseapp.com',
  projectId: 'freshdelivery-586d6',
  storageBucket: 'freshdelivery-586d6.appspot.com',
  messagingSenderId: '261457252443',
  appId: '1:261457252443:web:28ec6c5fa7a97dcdcf6f7e',
  measurementId: 'G-CWQQ3RLV91',
};

export default function Home() {
  const { query } = useRouter();
  const { data: productsData } = useProductsQuery({
    limit: LIMITS.PRODUCTS_LIMITS,
    ...query,
  });
  const { data: categoriesData } = useCategoriesQuery({
    limit: LIMITS.CATEGORIES_LIMITS,
    ...query,
  });

  async function addProducts() {
    const products = productsData?.pages?.[0]?.data;

    if (!products) return;

    console.log(products);

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const productsCollection = collection(db, 'products');

    products.forEach(({ id, ...product }) => {
      console.log(product);
      addDoc(productsCollection, product);
    });
  }

  async function addCategories() {
    const categories = categoriesData?.categories?.data;

    if (!categories) return;

    console.log(categories);

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const categoriesCollection = collection(db, 'categories');

    categories.forEach(({ id, ...category }) => {
      console.log(category);
      addDoc(categoriesCollection, category);
    });
  }

  useEffect(() => {}, [categoriesData]);

  return <Container></Container>;
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
    fetchCategories
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.PRODUCTS, { limit: LIMITS.PRODUCTS_LIMITS }],
    fetchProducts
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};
