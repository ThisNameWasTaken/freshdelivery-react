import { useModalAction } from '@components/modal/modal.context';
import { useUI } from '@contexts/ui.context';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from 'src/hooks/firebase';

const useAuth = () => {
  const { authorize, unauthorize } = useUI();
  const { closeModal } = useModalAction();

  async function signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log({ user });
      authorize();
    } catch (err) {
      console.error(err);
    }
  }

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      authorize();
      console.log({ user });
    } catch (err) {
      console.error(err);
    }
  }

  async function signOut() {
    try {
      await firebaseSignOut(auth);
      unauthorize();
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
      console.log({ user });
      await signIn({ email, password });
      authorize();
    } catch (err) {
      console.error(err);
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
