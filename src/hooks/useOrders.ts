import { useCart } from './../contexts/cart/cart.context';
import { Product } from '@framework/types';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import useUser from './useUser';

export type OrderItem = Product & { quntity: number };

export type Order = {
  items: OrderItem[];
  userId: string;
  deliveryHours: '09:00-12:00' | '12:00-16:00' | '16:00-19:00';
  deliveryAddress: string;
  contactNumber: string;
  isPayedFor: boolean;
  deliveryInstructions?: string;
  leaveAtDoorstep: boolean;
  deliveryTip?: string;
};

const useOrders = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const { items, isEmpty, resetCart } = useCart();
  const user = useUser();

  async function updateOrders() {
    if (!user) {
      setOrders(null);
      return;
    }

    const ordersCollection = collection(db, 'orders');
    const ordersQuery = query(
      ordersCollection,
      where('userId', '==', user.uid)
    );
    const ordersSnapshot = await getDocs(ordersQuery);
    const orders: Order[] = [];
    ordersSnapshot.forEach((doc) => {
      const order = doc.data();
      order.id = doc.id;
      orders.push(order as Order);
    });
    setOrders(orders);
  }

  // TODO: This should be part of the useCart hook
  async function placeOrder() {
    if (!user) return;
    if (isEmpty) return;

    try {
      const ordersCollection = collection(db, 'orders');
      const order = {
        userId: user.uid,
        items,
        deliveryHours: '09:00-12:00',
        deliveryAddress: 'Strada Margelelor 11, Sector 6, Bucuresti',
        contactNumber: '+40 777 888 888',
        isPayedFor: false,
        leaveAtDoorstep: false,
      };
      await addDoc(ordersCollection, order);
      // @ts-ignore
      setLastOrder(order);
      resetCart();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    updateOrders();
  }, [user]);

  return { orders, placeOrder, lastOrder };
};

export default useOrders;
