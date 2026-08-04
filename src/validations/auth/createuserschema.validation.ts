import { z } from "zod";

export const createUserSchema = {
  body: z.object({
    firstName: z
      .string()
      .trim()
      .min(2)
      .max(50),

    lastName: z
      .string()
      .trim()
      .min(2)
      .max(50),

    email: z
      .email()
      .toLowerCase(),

    password: z
      .string()
      .min(8)
      .max(32),

    age: z
      .number()
      .int()
      .positive()
      .optional()
  })
};
