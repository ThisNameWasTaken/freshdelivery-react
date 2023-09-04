import { Product } from '@framework/types';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { db } from './firebase';

const useProduct = (slug: string) => {
  const [product, setProduct] = useState<Product>();

  async function updateProduct() {
    const productsCollection = collection(db, '_products');
    const productQuery = query(productsCollection, where('slug', '==', slug));
    const productSnapshot = await getDocs(productQuery);
    const product = productSnapshot.docs[0].data();
    product.id = productSnapshot.docs[0].id;
    setProduct(product as Product);
  }

  useEffect(() => {
    updateProduct();
  }, [slug]);

  return { product };
};

export default useProduct;
