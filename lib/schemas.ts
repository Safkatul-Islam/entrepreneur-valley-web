import { z } from "zod";

/**
 * Form-facing schema. Used by the client form (react-hook-form + zodResolver)
 * and as the base for the server-side payload schema below.
 */
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

/**
 * Server-side payload schema. Adds bot-protection fields the API requires:
 *  - turnstileToken: Cloudflare Turnstile response token, verified server-side.
 *  - website: honeypot field. Bots fill any field they see; humans can't see it.
 *
 * The honeypot field is named "website" because that's the most-targeted
 * attribute name in scraped form fillers.
 */
export const registrationPayloadSchema = registrationSchema.extend({
  turnstileToken: z.string().min(1).max(2048),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type RegistrationPayload = z.infer<typeof registrationPayloadSchema>;
