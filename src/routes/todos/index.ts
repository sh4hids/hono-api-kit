import { createRouter } from '@/lib/createApp';
import { createTodoHandler, createTodoRoute } from '@/routes/todos/create';
import { getAllTodosHandler, getAllTodosRoute } from '@/routes/todos/getAll';
import { getByIdTodoHandler, getByIdTodoRoute } from '@/routes/todos/getById';

const router = createRouter()
    .openapi(getAllTodosRoute, getAllTodosHandler)
    .openapi(createTodoRoute, createTodoHandler)
    .openapi(getByIdTodoRoute, getByIdTodoHandler);

export default router;
