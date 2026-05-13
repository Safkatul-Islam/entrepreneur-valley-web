import { z } from "zod";

/* ------------------------------------------------------------------ */
/*  Pitcher-only registration (attendees register via LUMA)           */
/* ------------------------------------------------------------------ */

export const pitcherSchema = z.object({
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
    .min(1, "Phone number is required")
    .max(32, "Phone number is too long"),
  school: z
    .string()
    .trim()
    .min(2, "Which school do you attend?")
    .max(120),
  major: z
    .string()
    .trim()
    .min(2, "Please enter your major")
    .max(120),
  videoUrl: z.string().url("Please upload your pitch video"),
  consent: z
    .boolean()
    .refine((v) => v === true, "You must agree to be contacted"),
});

export type PitcherInput = z.infer<typeof pitcherSchema>;

/**
 * Server-side payload schema. Adds bot-protection fields the API requires:
 *  - turnstileToken: Cloudflare Turnstile response token, verified server-side.
 *  - website: honeypot field. Bots fill any field they see; humans can't see it.
 */
export const registrationPayloadSchema = pitcherSchema.extend({
  turnstileToken: z.string().min(1).max(2048),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type RegistrationPayload = z.infer<typeof registrationPayloadSchema>;
