import { User } from "@/model/user";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMonogram = (fullName: string) => {
  if (!fullName) return "?";
  const fullNameSplit = fullName.split(" ");
  if (fullNameSplit.length < 2) {
    return "?";
  }

  return `${fullNameSplit[0].at(0)}${fullNameSplit[1].at(0)}`;
};

export const getFullName = (user: User) => {
  if (!user) {
    return "";
  }
  return `${user.firstname ?? ""} ${user.lastname ?? ""}`;
};

export const comapreFields = <T extends Record<string, unknown>>(
  a: T,
  b: Partial<T>,
  keys: (keyof T)[],
) => {
  return keys.every((key) => a[key] === b[key]);
};
