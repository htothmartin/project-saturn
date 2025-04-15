"use client";

import { Modal } from "@/components/Modals";
import { Header } from "./components/header";
import { useAppSelector } from "@/lib/store/hooks";
import { selectSession } from "@/lib/store/features/session/session-selectors";
import { SplashScreen } from "@/components/SplashScreen";
import { useAuth } from "@/hooks/useAuth";
import { useWebsocket } from "@/hooks/use-websocket";

export default function Layout({
  children,
}: Readonly<{ children: React.JSX.Element }>) {
  const { isAuthenticating } = useAppSelector(selectSession);

  useAuth();
  useWebsocket();

  if (isAuthenticating) {
    return <SplashScreen />;
  }

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <Header />
        {children}
      </div>
      <Modal />
    </>
  );
}
