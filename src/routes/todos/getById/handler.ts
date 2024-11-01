import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import db from '@/db';
import { AppRouteHandler } from '@/lib/types';
import { GetByIdTodoRoute } from '@/routes/todos/getById/route';

export const getByIdTodoHandler: AppRouteHandler<GetByIdTodoRoute> = async (
    c
) => {
    const { id } = c.req.valid('param');
    const task = await db.query.todos.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, id);
        },
    });

    if (!task) {
        return c.json(
            { message: ReasonPhrases.NOT_FOUND },
            StatusCodes.NOT_FOUND
        );
    }

    return c.json(task, StatusCodes.OK);
};
