import {
  User as AuthUser,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, ReactNode, useContext } from 'react';
import { useAuth, useSigninCheck } from 'reactfire';

type State = {
  user: AuthUser | null | undefined;
  loading: boolean;
  error: Error | undefined;
};
export const AuthStateContext = createContext<State | undefined>(undefined);

type Actions = {
  signInWithGoogle: () => void;
  signOut: () => void;
};
export const AuthActionsContext = createContext<Actions | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const auth = useAuth();

  const { data, status, error } = useSigninCheck();

  const signInWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  const state: State = {
    user: data?.user,
    loading: status === 'loading',
    error,
  };

  const actions: Actions = {
    signInWithGoogle,
    signOut: () => signOut(auth),
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionsContext.Provider value={actions}>
        {state.loading ? 'Loading...' : children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
};

const useAuthActions = () => {
  const context = useContext(AuthActionsContext);
  if (context === undefined) {
    throw new Error('useAuthActions must be used within a AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuthState, useAuthActions };
