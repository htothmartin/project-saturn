'use client';

import { setupInterceptors } from '@/api/protectedApi';
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
};

const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
  setCurrentUser: () => {},
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
        const data = await me();
        if (data) {
          setCurrentUser(data);
          router.push('/projects');
        } else {
          setCurrentUser(undefined);
          router.push('/login');
        }
      } catch (_) {
        console.log('User is not logged in');
        setCurrentUser(undefined);
        router.push('/login');
      }
    };
    setupInterceptors(router, accessToken, setAccessToken);
    checkUserLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {currentUser ? children : <SplashScreen />}
    </AuthContext.Provider>
  );
};

export default AuthContext;
