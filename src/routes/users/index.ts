import { createRouter } from '@/lib/createApp';
import * as handlers from '@/routes/users/users.handler';
import * as routes from '@/routes/users/users.routes';

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
