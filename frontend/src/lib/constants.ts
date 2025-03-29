import { User } from "@/model/user";

export const lowerCaseRegex = /[a-z]+/;
export const upperCaseRegex = /[A-Z]+/;
export const numberRegex = /[0-9]+/;
export const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;
export const noop = () => {};

export const unprotectedPaths = ["/login", "/register"];

export const unassigned: User = {
  id: -1,
  fullName: "Unassigned",
  profilePictureUrl: "",
  firstname: "",
  lastname: "",
  connectedAccounts: [],
  email: "",
};
