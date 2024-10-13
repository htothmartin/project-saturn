'use client';

import { me } from '@/api/user';
import { SplashScreen } from '@/components/SplashScreen';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

type Auth = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  registeredAt: Date;
};

type AuthContextType = {
  auth: Auth | undefined;
  setAuth: Dispatch<SetStateAction<Auth | undefined>>;
};

const AuthContext = createContext<AuthContextType>({
  auth: undefined,
  setAuth: () => {},
});

type Props = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Auth | undefined>();
  const router = useRouter();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const data = await me();
        if (data) {
          setAuth(data);
          router.push('/projects');
        } else {
          setAuth(undefined);
          router.push('/login');
        }
      } catch (_) {
        console.log('User is not logged in');
        setAuth(undefined);
        router.push('/login');
      }
    };

    checkUserLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {auth ? children : <SplashScreen />}
    </AuthContext.Provider>
  );
};

export default AuthContext;
