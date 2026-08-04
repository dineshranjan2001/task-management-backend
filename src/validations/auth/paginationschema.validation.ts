import { z } from "zod";

export const paginationSchema = {
    query: z.object({
        page: z.coerce.number().default(1),

        limit: z.coerce.number().default(10),

        search: z.string().optional(),

        sortBy: z.string().optional(),

        order: z.enum(["asc", "desc"]).default("desc")
    })
};