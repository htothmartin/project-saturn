import { ModalTypes } from "@/enums/ModalTypes";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useModal = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const getModalUrl = useCallback(
    (modalType: ModalTypes) =>
      `${pathname}?${createQueryString("modal", modalType)}`,
    [pathname, createQueryString],
  );

  return { getModalUrl };
};
