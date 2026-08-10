import { z } from "zod";

export const googleSchema = z.object({
    credential: z
        .string()
        .min(20)
}); 