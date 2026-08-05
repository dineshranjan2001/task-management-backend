import { z } from "zod";

export const createRoleMasterSchema = {
  body: z.object({
    roleName: z
      .string()
      .trim()
      .min(2)
      .max(50)
  })
};
