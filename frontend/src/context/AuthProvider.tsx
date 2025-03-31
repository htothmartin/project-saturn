"use client";

import { refreshAccessToken } from "@/api/auth";
import { protectedApi } from "@/api/axios";
import { me } from "@/api/user";
import { SplashScreen } from "@/components/SplashScreen";
import { User } from "@/model/user";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type AuthContext = {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContext>({
  auth: { user: null, accessToken: "" },
  setAuth: () => {},
  isLoading: true,
});

type Props = {
  children: React.JSX.Element;
};

export type Auth = {
  user: User | null;
  accessToken: string;
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Auth>({ user: null, accessToken: "" });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useLayoutEffect(() => {
    const requestIntercept = protectedApi.interceptors.request.use(
      (config) => {
        if (auth.user && auth.accessToken) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = protectedApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true;
          try {
            const newAccessToken = await refreshAccessToken();
            setAuth((prev) => {
              return { ...prev, accessToken: newAccessToken };
            });
            originalRequest.headers["Authorization"] =
              `Bearer ${newAccessToken}`;
          } catch (error) {
            console.error(error);
            setAuth({ user: null, accessToken: "" });
            router.replace("/login");
          }

          return protectedApi(originalRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      protectedApi.interceptors.request.eject(requestIntercept);
      protectedApi.interceptors.response.eject(responseIntercept);
    };
  }, [auth.accessToken]); // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    (async () => {
      try {
        const user = await me();
        setAuth((prev) => {
          return { ...prev, user: user };
        });
      } catch (error) {
        console.error(error);
        setAuth({ user: null, accessToken: "" });
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading }}>
      {isLoading ? <SplashScreen /> : children}
    </AuthContext.Provider>
  );
};
