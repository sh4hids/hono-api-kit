import { createRouter } from '@/lib/createApp';
import { createTodoHandler, createTodoRoute } from '@/routes/todos/create';
import { deleteTodoHandler, deleteTodoRoute } from '@/routes/todos/delete';
import { getAllTodosHandler, getAllTodosRoute } from '@/routes/todos/getAll';
import { getByIdTodoHandler, getByIdTodoRoute } from '@/routes/todos/getById';
import { updateTodoHandler, updateTodoRoute } from '@/routes/todos/update';

const router = createRouter()
    .openapi(getAllTodosRoute, getAllTodosHandler)
    .openapi(createTodoRoute, createTodoHandler)
    .openapi(getByIdTodoRoute, getByIdTodoHandler)
    .openapi(updateTodoRoute, updateTodoHandler)
    .openapi(deleteTodoRoute, deleteTodoHandler);

export default router;
