import { IssueType } from '@/enums/IssueType';
import { TicketPriority } from '@/enums/TicketPriority';
import { z } from 'zod';

export const createProjectSchema = z.object({
  projectName: z.string().min(1, 'The project name is required.'),
  projectDescription: z.string().optional(),
  projectKey: z
    .string()
    .min(2, 'The project key is required.')
    .max(6, "The porject key can't be longer than 6 character."),
});

export const addTicketSchema = z.object({
  ticketTitle: z.string().min(1, 'The ticket title is required.'),
  ticketDescription: z.string().optional(),
  ticketPriority: z.nativeEnum(TicketPriority),
  issueType: z.nativeEnum(IssueType),
});

export const addMemeberSchema = z.object({
  email: z.string().email(),
});

export const updateUserDetialsSchema = z.object({
  firstname: z.string().min(1, 'Please enter your firstname.'),
  lastname: z.string().min(1, 'Please enter your lastname.'),
});
