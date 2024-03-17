import React from 'react';
import { useStorageState } from './useStorageState';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const userRef = doc(FIRESTORE_DB, "users",  response.user?.uid!);
      const user = (await getDoc(userRef)).data();
      setSession(response.user.uid);

      console.log("session", session);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string, role: string) => {
    try {
      const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      setSession(response.user.uid);
      await setDoc(doc(FIRESTORE_DB, "users", response.user.uid), {
        email: email,
        name: name,
        role: role,
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
