import { onAuthStateChanged, User } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from './firebase';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  return user;
};

export default useUser;
