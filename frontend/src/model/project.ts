import { ProjectStatus } from "@/enums/ProjectStatus";
import { Ticket } from "./tickets";
import { ProjectUser, User } from "./user";
import { Sprint } from "./sprint";

export type Project = {
  id: number;
  owner: User;
  name: string;
  description: string;
  pin: boolean;
  key: string;
  status: ProjectStatus;
  ticketCount: number;
  closedTickets: number;
};

export type ProjectForm = {
  name: string;
  description: string;
  key: string;
};

export type ActiveProject = {
  id: number;
  name: string;
  owner: User;
  description: string;
  key: string;
  status: ProjectStatus;
  sprints: Sprint[];
  tickets: Ticket[];
  users: ProjectUser[];
};
