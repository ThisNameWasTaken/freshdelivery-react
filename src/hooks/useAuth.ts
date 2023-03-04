import { useUI } from '@contexts/ui.context';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from 'src/hooks/firebase';
import { useRouter } from 'next/router';

const useAuth = () => {
  const { authorize, unauthorize } = useUI();
  const router = useRouter();

  async function signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      authorize();
      return user;
    } catch (err) {
      console.error(err);
      return { err };
    }
  }

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      authorize();
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  async function signOut() {
    try {
      await firebaseSignOut(auth);
      unauthorize();
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  async function signUp({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await signIn({ email, password });
      authorize();
      return user;
    } catch (err) {
      console.error(err);
      return { err };
    }
  }

  return {
    signIn,
    signInWithGoogle,
    signOut,
    signUp,
  };
};

export default useAuth;
