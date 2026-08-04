import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { logger } from "./configs/logger.config";
import { env } from "./configs/env.config";
import { errorHandler } from "./middlewares/errorhandler.middleware";
import prisma from "./configs/db.config";
import type { Server } from "node:http";
import v1Router from "./routes/v1/index.routes";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(pinoHttp({ logger }));
app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
    }),
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", v1Router);

app.use(errorHandler);


export function registerGracefulShutdown(server: Server) {
    async function shutdown(signal: string) {
        logger.info(`${signal} received. Shutting down...`);
        server.close(async () => {
            await prisma.$disconnect();
            logger.info("Server closed.");
            process.exit(0);
        });
    }

    process.on("SIGINT", () => void shutdown("SIGINT"));
    process.on("SIGTERM", () => void shutdown("SIGTERM"));
}
export default app;