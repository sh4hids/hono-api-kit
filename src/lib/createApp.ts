import { OpenAPIHono } from '@hono/zod-openapi';

import defaultHook from '@/lib/defaultHook';
import { AppBindings, AppOpenAPI } from '@/lib/types';
import logger from '@/middlewares/logger';
import notFound from '@/middlewares/notFound';
import onError from '@/middlewares/onError';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(logger());

  app.notFound(notFound);
  app.onError(onError);
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route('/', router);
}
