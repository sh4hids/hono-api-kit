import { StatusCodes } from 'http-status-codes';

import db from '@/db';
import { AppRouteHandler } from '@/lib/types';
import { GetAllTodosRoute } from '@/routes/todos/getAll/route';

export const getAllTodosHandler: AppRouteHandler<GetAllTodosRoute> = async (
    c
) => {
    const todos = await db.query.todos.findMany();

    return c.json(todos, StatusCodes.OK);
};
