import { Ticket } from './tickets';
import { User } from './user';

export type Project = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  key: string;
  projectStatus: string;
};

export type ProjectForm = {
  name: string;
  description: string;
  imageUrl: string;
  key: string;
};

export type ActiveProject = {
  project: Project;
  tickets: Ticket[];
  users: User[];
};
