import { z } from "zod";

export const userIdSchema = {
    params: z.object({
        id: z.uuid()
    })
};