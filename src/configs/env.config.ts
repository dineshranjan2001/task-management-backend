import "dotenv/config";
import { z } from "zod";
import { NODE_ENV } from "../enums/env.enum";

const envSchema = z.object({
    NODE_ENV: z.enum([NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION, NODE_ENV.UAT]),
    PORT: z.coerce.number().default(8000),
    DATABASE_URL: z.url(),
    JWT_ACCESS_SECRET: z.string().min(32),
    JWT_REFRESH_SECRET: z.string().min(32),
    CORS_ORIGIN: z.string(),
});


const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("Invalid Environment Variables");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
}
export const env = parsed.data;

