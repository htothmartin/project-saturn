import { ProjectRole } from "@/enums/ProjectRole";
import { ProjectUser } from "@/model/user";

export const lowerCaseRegex = /[a-z]+/;
export const upperCaseRegex = /[A-Z]+/;
export const numberRegex = /[0-9]+/;
export const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;
export const noop = () => {};

export const unprotectedPaths = ["/login", "/register"];

export const unassigned: ProjectUser = {
  id: -1,
  profilePictureUrl: "",
  firstname: "Unassigned",
  lastname: "",
  connectedAccounts: [],
  email: "",
  role: ProjectRole.DEVELOPER,
};
