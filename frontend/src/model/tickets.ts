import { IssueType } from "@/enums/IssueType";
import { TicketPriority } from "@/enums/TicketPriority";
import { User } from "./user";
import { TicketStatus } from "@/enums/TicketStatus";

export type TicketForm = {
  title: string;
  description: string;
  priority: TicketPriority;
  type: IssueType;
  projectId: number;
};

export type Ticket = {
  id: number;
  title: string;
  description: string;
  assignee: User | null;
  reporter: User;
  status: TicketStatus;
  issueType: IssueType;
  createdAt: Date;
  updatedAt: Date;
  ticketPriority: TicketPriority;
  sprintId: number;
};

export type UpdateTicket = {
  title?: string;
  description?: string;
  assigneeId?: string;
  status?: TicketStatus;
  issueType?: IssueType;
  priority?: TicketPriority;
  sprintId?: string | number;
};
