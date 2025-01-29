import { TicketForm, UpdateTicket } from '@/model/tickets';
import { protectedApi } from './axios';

export const createTicket = async (projectId: string, ticket: TicketForm) => {
  return await protectedApi.post(`/projects/${projectId}/tickets`, {
    ...ticket,
  });
};

export const updateTicket = async (
  projectId: string,
  ticketId: string,
  updateTicket: UpdateTicket,
) => {
  return await protectedApi.patch(`projects/${projectId}/tickets/${ticketId}`, {
    ...updateTicket,
  });
};
