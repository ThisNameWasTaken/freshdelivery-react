import { Product } from '@framework/types';
import { collection, getDocs } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { db } from './firebase';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  async function updateProducts() {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const products: Product[] = [];
    productsSnapshot.forEach((doc) => {
      const product = doc.data();
      product.id = doc.id;
      products.push(product as Product);
    });
    setProducts(products);

    console.log(products?.[9]);

    // try {
    //   const res = await fetch('http://localhost:5000/recommended-products/4');
    //   const data = await res.json();
    //   console.log(data);
    // } catch (err) {
    //   console.error(err);
    // }
  }

  useEffect(() => {
    updateProducts();
  }, []);

  return products;
};

export default useProducts;
