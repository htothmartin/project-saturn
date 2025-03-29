import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMonogram = (fullName: string) => {
  if (!fullName) return '';
  return `${fullName.split(' ')[0].at(0)}${fullName.split(' ')[1].at(0)}`;
};
