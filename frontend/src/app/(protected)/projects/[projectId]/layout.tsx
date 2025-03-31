import { Sidebar } from "./components/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.JSX.Element;
}>) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      {children}
    </div>
  );
}
