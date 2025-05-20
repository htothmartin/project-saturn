"use client";

import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  children: React.JSX.Element;
  title: string;
  closeable?: boolean;
};

export function ModalBase({
  children,
  title,
  closeable,
}: Props): React.JSX.Element {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed top-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
        <Card className="lg:1/2 h-1/2 w-4/5 md:w-4/6 xl:w-2/5">
          <CardHeader className="flex h-[15%] flex-row items-center">
            <CardTitle>{title}</CardTitle>
            {closeable && (
              <Link className="ml-auto" href={pathname}>
                <X />
              </Link>
            )}
          </CardHeader>
          <CardContent className="h-[85%]">{children}</CardContent>
        </Card>
      </div>
    </>
  );
}
