import { Modal } from "@/components/Modals";
import StoreProvider from "@/context/StoreProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { Header } from "./components/header";

export default function Layout({
  children,
}: Readonly<{ children: React.JSX.Element }>) {
  return (
    <AuthProvider>
      <StoreProvider>
        <div className="flex h-screen w-screen flex-col">
          <Header />
          {children}
        </div>
        <Modal />
      </StoreProvider>
    </AuthProvider>
  );
}
