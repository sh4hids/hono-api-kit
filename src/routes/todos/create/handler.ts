import { StatusCodes } from 'http-status-codes';

import db from '@/db';
import { todos } from '@/db/schema';
import { AppRouteHandler } from '@/lib/types';
import { CreateTodoRoute } from '@/routes/todos/create/route';

export const createTodoHandler: AppRouteHandler<CreateTodoRoute> = async (
    c
) => {
    const task = c.req.valid('json');

    const [newTask] = await db.insert(todos).values(task).returning();

    return c.json(newTask, StatusCodes.OK);
};
