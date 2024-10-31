import { OpenAPIHono } from '@hono/zod-openapi';

import { AppBindings } from '@/lib/types';
import logger from '@/middlewares/logger';
import notFound from '@/middlewares/notFound';
import onError from '@/middlewares/onError';

export function createRouter() {
    return new OpenAPIHono<AppBindings>({
        strict: false,
    });
}

export default function createApp() {
    const app = new OpenAPIHono<AppBindings>({
        strict: false,
    });

    app.use(logger());

    app.notFound(notFound);
    app.onError(onError);

    return app;
}
