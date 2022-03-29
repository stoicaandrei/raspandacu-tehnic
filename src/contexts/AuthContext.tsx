import {
  User as AuthUser,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useAuth, useSigninCheck } from 'reactfire';

type State = {
  user: AuthUser | null | undefined;
  loading: boolean;
  error: Error | undefined;
};
export const AuthStateContext = createContext<State | undefined>(undefined);

type Actions = {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
};
export const AuthActionsContext = createContext<Actions | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const auth = useAuth();
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  const { data, status, error } = useSigninCheck();
  const user = data?.user;

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    if (!isAdminRoute) return;
    if (status === 'loading') return;

    if (user && router.pathname === '/admin/signin') router.replace('/admin');
    else if (!user) router.replace('/admin/signin');
  }, [user]);

  const state: State = {
    user: data?.user,
    loading: status === 'loading',
    error,
  };

  const actions: Actions = {
    signIn,
    signOut: () => signOut(auth),
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionsContext.Provider value={actions}>
        {isAdminRoute && state.loading ? 'Loading...' : children}
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
