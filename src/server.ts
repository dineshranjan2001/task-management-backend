import app, { registerGracefulShutdown } from "./app";
import { env } from "./configs/env.config";
import { logger } from "./configs/logger.config";

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});

registerGracefulShutdown(server);