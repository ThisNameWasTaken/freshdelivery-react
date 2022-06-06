import { Product } from '@framework/types';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { db } from './firebase';

const useRelatedProducts = (product?: Product) => {
  const [targetProduct, setTargetProduct] = useState<Product | undefined>(
    product
  );
  const [relatedProducts, setRelatedProducts] = useState<Product[]>();

  async function updateProducts() {
    if (!targetProduct) return;

    const productsCollection = collection(db, 'products');
    const sameCategoryQuery = query(
      productsCollection,
      where('tag', 'array-contains-any', targetProduct.tag)
    );
    const productsSnapshot = await getDocs(sameCategoryQuery);
    const products: Product[] = [];
    productsSnapshot.forEach((doc) => {
      const product = doc.data();
      product.id = doc.id;
      products.push(product as Product);
    });
    setRelatedProducts(products);
  }

  useEffect(() => {
    setTargetProduct(product);
  }, [product]);

  useEffect(() => {
    updateProducts();
  }, [targetProduct]);

  return { relatedProducts, targetProduct, setTargetProduct };
};

export default useRelatedProducts;
