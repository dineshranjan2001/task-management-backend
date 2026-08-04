import pino, { destination } from 'pino';
import { env } from './env.config';
import { NODE_ENV } from '../enums/env.enum';
import path from 'node:path';

export const logger = pino({
    level: env.NODE_ENV === NODE_ENV.DEVELOPMENT ? "debug" : "info",
    transport: env.NODE_ENV === 'development' ?
        {
            targets: [{
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: "SYS:standard",
                    ignore: "pid,hostname",
                }
            }]
        }
        : {
            targets: [{
                target: 'pino/file',
                level: 'info',
                options: {
                    destination: path.join(__dirname, '../../logs/app.log'),
                    mkdir: true,
                    sync: false,
                }
            }]
        }
});