import { IssueType } from '@/enums/IssueType';
import { TicketPriority } from '@/enums/TicketPriority';

export type TicketForm = {
  title: string;
  description: string;
  priority: TicketPriority;
  type: IssueType;
  projectId: number;
};
