import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .max(32)
    .optional()
    .or(z.literal("")),
  school: z
    .string()
    .trim()
    .min(2, "Which school do you attend?")
    .max(120),
  yearMajor: z
    .string()
    .trim()
    .min(2, "Year and major, please")
    .max(120),
  dietary: z.string().trim().max(200).optional().or(z.literal("")),
  accessibility: z.string().trim().max(200).optional().or(z.literal("")),
  motivation: z
    .string()
    .trim()
    .max(500, "Keep it under 500 characters")
    .optional()
    .or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, "You must agree to be contacted"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
