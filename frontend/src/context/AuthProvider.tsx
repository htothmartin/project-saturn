'use client';

import { me } from '@/api/user';
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

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const { data } = await me();
        if (data && data.user) {
          setAuth(data.user);
        } else {
          setAuth(undefined);
        }
      } catch (error) {
        console.log('User is not logged in', error);
        setAuth(undefined);
      }
    };

    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
