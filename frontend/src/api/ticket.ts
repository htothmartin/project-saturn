import { TicketForm } from '@/model/tickets';
import { protectedApi } from './axios';

export const createTicket = async (ticket: TicketForm) => {
  return await protectedApi.post('/tickets', { ...ticket });
};
