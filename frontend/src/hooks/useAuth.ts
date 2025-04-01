import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectSession } from "@/lib/store/features/session/session-selectors";
import { protectedApi } from "@/api/axios";
import { refreshAccessToken } from "@/api/auth";
import {
  clearUserData,
  setAccessToken,
  setCurrentUser,
} from "@/lib/store/features/session/session-slice";
import { me } from "@/api/user";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { accessToken } = useAppSelector(selectSession);

  useLayoutEffect(() => {
    const requestIntercept = protectedApi.interceptors.request.use(
      (config) => {
        if (accessToken && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
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
            dispatch(setAccessToken(newAccessToken));
            originalRequest.headers["Authorization"] =
              `Bearer ${newAccessToken}`;
          } catch (_) {
            dispatch(clearUserData());
            router.push("/login");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    (async () => {
      try {
        const user = await me();
        dispatch(setCurrentUser(user));
      } catch (error) {
        console.error(error);
        dispatch(clearUserData());
        router.push("/login");
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
