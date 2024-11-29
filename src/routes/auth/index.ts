import { createRouter } from '@/lib/createApp';
import * as handlers from '@/routes/auth/auth.handler';
import * as routes from '@/routes/auth/auth.routes';

const router = createRouter()
  .openapi(routes.login, handlers.login)
  .openapi(routes.refreshAccessToken, handlers.refereshAccessTokenRoute);

export default router;
