import React from 'react';
import { useStorageState } from './useStorageState';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebaseConfig';

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
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
      setSession(response.user.uid);
      console.log("session", session);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      setSession(response.user.uid);
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
