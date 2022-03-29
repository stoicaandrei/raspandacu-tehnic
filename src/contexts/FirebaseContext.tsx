import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { ReactNode } from 'react';
import {
  FirebaseAppProvider,
  FirestoreProvider,
  AuthProvider as FirebaseAuthProvider,
  StorageProvider,
  useFirebaseApp,
} from 'reactfire';

type Props = {
  children: ReactNode;
};

const firebaseConfig = {
  apiKey: 'AIzaSyDE1jNtb8--ibzww3kbK363ijVwNGs2fro',
  authDomain: 'raspandacu-tehnic.firebaseapp.com',
  projectId: 'raspandacu-tehnic',
  storageBucket: 'raspandacu-tehnic.appspot.com',
  messagingSenderId: '453601621538',
  appId: '1:453601621538:web:d52415415f74b78008fc7b',
  measurementId: 'G-GDB42C4WRL',
};

export const FirebaseSDKProvider = ({ children }: Props) => {
  const app = useFirebaseApp();

  const firestore = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  return (
    <FirestoreProvider sdk={firestore}>
      <FirebaseAuthProvider sdk={auth}>
        <StorageProvider sdk={storage}>{children}</StorageProvider>
      </FirebaseAuthProvider>
    </FirestoreProvider>
  );
};

const FirebaseProvider = ({ children }: Props) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseSDKProvider>{children}</FirebaseSDKProvider>
    </FirebaseAppProvider>
  );
};

export { FirebaseProvider };
