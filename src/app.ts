import { logger, notFound, onError } from '@/middlewares';
import { OpenAPIHono } from '@hono/zod-openapi';
import { PinoLogger } from 'hono-pino';

interface AppBindings {
    Variables: {
        logger: PinoLogger;
    };
}

const app = new OpenAPIHono<AppBindings>();

app.use(logger());

app.get('/', (c) => {
    return c.text('Hello Hono!');
});

app.get('/err', (c) => {
    c.var.logger.info('From error handler');

    throw new Error('Noooo....!');
});

app.notFound(notFound);
app.onError(onError);

export default app;
