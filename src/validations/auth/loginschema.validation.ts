import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email()
    .trim()
    .transform((value) =>
      value.toLowerCase()
    ),

  password: z
    .string()
    .min(1),

  rememberMe: z
    .boolean()
    .optional()
    .default(false)
});

