import { ProjectRole } from "@/enums/ProjectRole";
import { ConnectedAccount } from "./connected-accounts";

export type User = {
  id: number;
  profilePictureUrl: string;
  firstname: string;
  lastname: string;
  email: string;
  connectedAccounts: ConnectedAccount[];
};

export type ProjectUser = User & {
  role: ProjectRole;
};
