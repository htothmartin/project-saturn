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
