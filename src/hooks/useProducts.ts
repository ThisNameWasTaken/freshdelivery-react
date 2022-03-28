import { collection, getDocs } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { db } from './firebase';

type Product = any;

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  async function updateProducts() {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const products: Product[] = [];
    productsSnapshot.forEach((doc) => {
      const product = doc.data();
      product.id = doc.id;
      products.push(product);
    });
    setProducts(products);
  }

  useEffect(() => {
    updateProducts();
  }, []);

  return products;
};

export default useProducts;
