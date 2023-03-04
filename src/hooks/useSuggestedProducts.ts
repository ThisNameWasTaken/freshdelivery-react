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

const useSuggestedProducts = () => {
  const user = useUser();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>();

  async function updateProducts() {
    if (!user) return;

    const recommendationsSnapshot = await getDoc(
      doc(db, 'recommendations', user.uid)
    );
    const data = recommendationsSnapshot.data();
    const slugs: string[] = data?.recommendations || [];
    const productsCollection = collection(db, 'products');

    const products: Product[] = [];

    const recommendationDocs = await Promise.all(
      slugs.map((slug) => {
        const sameCategoryQuery = query(
          productsCollection,
          where('slug', '==', slug)
        );
        return getDocs(sameCategoryQuery);
      })
    );

    recommendationDocs.forEach((collection) => {
      collection.docs.forEach((doc) => {
        const product = doc.data();
        product.id = doc.id;
        products.push(product as Product);
      });
    });

    setSuggestedProducts(products);
  }

  useEffect(() => {
    updateProducts();
  }, [user]);

  return suggestedProducts;
};

export default useSuggestedProducts;
