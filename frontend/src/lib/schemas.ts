import { IssueType } from "@/enums/IssueType";
import { TicketPriority } from "@/enums/TicketPriority";
import { z } from "zod";
import {
  lowerCaseRegex,
  numberRegex,
  specialRegex,
  upperCaseRegex,
} from "./constants";

export const createProjectSchema = z.object({
  projectName: z.string().min(1, "The project name is required."),
  projectDescription: z.string().optional(),
  projectKey: z
    .string()
    .min(2, "The project key is required.")
    .max(6, "The porject key can't be longer than 6 character."),
});

export const addTicketSchema = z.object({
  ticketTitle: z.string().min(1, "The ticket title is required."),
  ticketDescription: z.string().optional(),
  ticketPriority: z.nativeEnum(TicketPriority),
  issueType: z.nativeEnum(IssueType),
});

export const addMemeberSchema = z.object({
  email: z.string().email(),
});

export const updateUserDetialsSchema = z.object({
  firstname: z.string().min(1, "Please enter your firstname."),
  lastname: z.string().min(1, "Please enter your lastname."),
});

export const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email address!"),
    firstname: z.string().min(1, "Please enter your firstname."),
    lastname: z.string().min(1, "Please enter your lastname."),
    password: z
      .string()
      .min(1, "Please enter a password!")
      .min(8, "Password should minimum 8 characther!")
      .refine((value) => lowerCaseRegex.test(value), {
        message: "The password must contain atleast one lowercase character.",
      })
      .refine((value) => upperCaseRegex.test(value), {
        message: "The password must contain atleast one uppercase character.",
      })
      .refine((value) => numberRegex.test(value), {
        message: "The password must contain atleast one number.",
      })
      .refine((value) => specialRegex.test(value), {
        message: "The password must contain atleast one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords must match.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("This is not a valid email address."),
  password: z.string(),
});
