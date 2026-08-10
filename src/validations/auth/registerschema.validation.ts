import { z } from "zod";

export const registerSchema  = {
  body: z.object({
    workspaceName: z
      .string()
      .trim()
      .min(2)
      .max(200),
    firstName: z
      .string()
      .trim()
      .min(2)
      .max(100),

    lastName: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    email: z
      .email()
      .trim()
      .max(320)
      .transform((value) =>
        value.toLowerCase()),

    password: z
      .string()
      .min(8)
      .max(128),

    confirmPassword: z
      .string(),

    rememberMe: z
      .boolean()
      .optional()
      .default(false)
  })
    .refine((data) =>
      data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"]
    })
};
