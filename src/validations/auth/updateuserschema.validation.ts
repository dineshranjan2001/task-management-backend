import { z } from "zod";

export const updateUserSchema = {
  body: z.object({
    firstName: z.string().min(2).optional(),

    lastName: z.string().optional(),

    age: z.number().optional()
  })
};