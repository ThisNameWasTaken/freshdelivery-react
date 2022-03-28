import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAjw59aH8-8wwLb_yNfybAtLFbIMgZDrOM',
  authDomain: 'freshdelivery-586d6.firebaseapp.com',
  projectId: 'freshdelivery-586d6',
  storageBucket: 'freshdelivery-586d6.appspot.com',
  messagingSenderId: '261457252443',
  appId: '1:261457252443:web:28ec6c5fa7a97dcdcf6f7e',
  measurementId: 'G-CWQQ3RLV91',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };
