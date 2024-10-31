import { createRouter } from '@/lib/createApp';
import { getAllHandler } from '@/routes/todos/getAll/handler';
import { getAllRoute } from '@/routes/todos/getAll/route';

const router = createRouter().openapi(getAllRoute, getAllHandler);

export default router;
