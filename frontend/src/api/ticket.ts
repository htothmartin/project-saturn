import { TicketForm, UpdateTicket } from "@/model/tickets";
import { protectedApi } from "./axios";

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

export const createMessage = async (
  projectId: string,
  ticketId: string,
  authorId: number,
  content: string,
) => {
  return await protectedApi.post(
    `projects/${projectId}/tickets/${ticketId}/comments`,
    { authorId, content },
  );
};

export const getMessages = async (projectId: string, ticketId: string) => {
  return await protectedApi.get(
    `projects/${projectId}/tickets/${ticketId}/comments`,
  );
};
