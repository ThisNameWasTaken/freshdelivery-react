import { Product } from '@framework/types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import useUser from './useUser';
import useProducts from './useProducts';
import { useQuery } from 'react-query';

async function fetchSuggestedProducts() {
  const res = await fetch('http://localhost:5000/recommended-products/1042');

  const json = await res.json();

  return json;
}

const useSuggestedProducts = () => {
  const user = useUser();
  const id = '1042';
  const { data } = useQuery(`suggested-products-${id}`, fetchSuggestedProducts);

  const products = useProducts();

  const fetchedIds = Array.isArray(data);

  const suggestedProducts = products.filter(
    !fetchedIds ? () => true : (product) => data.includes(product.id)
  );

  return suggestedProducts;
};

export default useSuggestedProducts;
