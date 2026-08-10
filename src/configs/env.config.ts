import "dotenv/config";
import { z } from "zod";
import { NODE_ENV } from "../enums/env.enum";

const envSchema = z.object({
    NODE_ENV: z.enum([NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION, NODE_ENV.UAT]),
    PORT: z.coerce.number().default(8000),
    DATABASE_URL: z.string().min(1),
    REDIS_URL: z.string().min(1),
    JWT_ACCESS_SECRET: z.string().min(32),
    JWT_REFRESH_SECRET: z.string().min(32),
    CORS_ORIGIN: z.string(),
    JWT_PRIVATE_KEY_PATH: z.string().min(1),
    JWT_PUBLIC_KEY_PATH: z.string().min(1),
    JWT_ISSUER: z.string().min(1),
    JWT_AUDIENCE: z.string().min(1),
    ACCESS_TOKEN_EXPIRES_IN: z.string(),
    REFRESH_TOKEN_EXPIRES_IN: z.string(),
    REMEMBER_ME_REFRESH_TOKEN_EXPIRES_IN: z.string(),
    COOKIE_NAME: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    //LOG_LEVEL: z.string().default("info")
});


const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("Invalid Environment Variables");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
}
export const env = parsed.data;

