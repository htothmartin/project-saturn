'use client';

import { setupInterceptors } from '@/api/protectedApi';
import { me } from '@/api/user';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

type CurrentUser = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  registeredAt: Date;
};

type AuthContextType = {
  currentUser: CurrentUser | undefined;
  setCurrentUser: Dispatch<SetStateAction<CurrentUser | undefined>>;
  setAccessToken: Dispatch<SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
  setCurrentUser: () => {},
  setAccessToken: () => {},
});

type Props = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>();
  const [accessToken, setAccessToken] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        if (!currentUser) {
          const data = await me();
          if (data) {
            setCurrentUser(data);
            router.push('/projects');
          } else {
            setCurrentUser(undefined);
            router.push('/login');
          }
        }
      } catch (error) {
        console.log('User is not logged in');
        console.error(error);
        setCurrentUser(undefined);
        router.push('/login');
      }
    };
    checkUserLoggedIn();
    setupInterceptors(router, accessToken, setAccessToken);
  }, []);
  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
