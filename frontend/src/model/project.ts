import { ProjectStatus } from '@/enums/ProjectStatus';
import { Ticket } from './tickets';
import { User } from './user';

export type Project = {
  id: number;
  name: string;
  description: string;
  pin: boolean;
  key: string;
  projectStatus: ProjectStatus;
  ticketCount: number;
  closedTickets: number;
};

export type ProjectForm = {
  name: string;
  description: string;
  key: string;
};

export type ActiveProject = {
  project: Project;
  tickets: Ticket[];
  users: User[];
};
