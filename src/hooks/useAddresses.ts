import { Address } from '@framework/types';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import useUser from './useUser';

const useAddresses = (address: Address | undefined) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const user = useUser();
  const addressesCollection = collection(db, `/users/${user?.uid}/addresses`);

  async function updateAddresses() {
    if (!user) return;

    const addressesSnapshot = await getDocs(addressesCollection);
    const addresses: Address[] = [];
    addressesSnapshot.forEach((doc) => {
      const address = doc.data() as Address;
      address.id = doc.id;
      addresses.push(address);
    });
    setAddresses(addresses);
  }

  async function addAddress(address: {
    title: string;
    default?: boolean;
    address: {
      lat?: number;
      lng?: number;
      formattedAddress: string;
    };
  }) {
    if (!user || !address) return;

    await addDoc(addressesCollection, address);

    updateAddresses();
  }

  async function updateAddress({ ...address }: Address) {
    if (!user || !address) return;
    return updateDoc(
      doc(db, `/users/${user.uid}/addresses`, address.id),
      address as any
    );
  }

  async function deleteAddress(addressId: string) {
    if (!user) return;
    return deleteDoc(doc(db, `/users/${user.uid}/addresses`, addressId));
  }

  useEffect(() => {
    if (!address) return;
    updateAddresses();
  }, [address, user]);

  return {
    addresses,
    addAddress,
    updateAddresses,
    updateAddress,
    deleteAddress,
  };
};

export default useAddresses;
