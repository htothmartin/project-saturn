import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./scss/style.scss";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import Loading from "./loading";
import StoreProvider from "@/context/StoreProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <Suspense fallback={<Loading />}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <StoreProvider>{children}</StoreProvider>
          </ThemeProvider>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
