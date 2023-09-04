import { doc, getDoc } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import useUser from './useUser';
import { Order } from './useOrders';

const useOrder = (id: string) => {
  const [order, setOrder] = useState<Order | null>(null);
  const user = useUser();

  async function updateOrder() {
    const orderDoc = await getDoc(doc(db, 'orders', id));
    const order = {
      ...orderDoc.data(),
      id,
    } as Order;
    setOrder(order);
  }

  useEffect(() => {
    updateOrder();
  }, [user]);

  return order;
};

export default useOrder;
