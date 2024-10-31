import { pinoLogger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

import env from '@/env';

export default function logger() {
    return pinoLogger({
        pino: pino(
            {
                level: env.LOG_LEVEL || 'info',
                redact: ['password', 'token', 'secret'],
            },
            env.NODE_ENV === 'production' ? undefined : pretty()
        ),
        http: {
            reqId: () => crypto.randomUUID(),
        },
    });
}
