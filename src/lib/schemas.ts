import { z } from "zod";

// Zod schema for the contact form.
// Validated client-side; a server action should re-validate server-side before sending.
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters")
    .regex(/^[\p{L}\p{M}'\-\s]+$/u, "Name contains invalid characters"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email address is too long"),

  subject: z
    .string()
    .min(4, "Subject must be at least 4 characters")
    .max(120, "Subject must be under 120 characters"),

  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message must be under 2000 characters"),

  // Honeypot field — must remain empty. Filled only by bots.
  _hp: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
