import { eq } from 'drizzle-orm';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import db from '@/db';
import { todos } from '@/db/schema';
import { AppRouteHandler } from '@/lib/types';
import { UpdateTodoRoute } from '@/routes/todos/update/route';

export const updateTodoHandler: AppRouteHandler<UpdateTodoRoute> = async (
    c
) => {
    const { id } = c.req.valid('param');
    const update = c.req.valid('json');

    const [task] = await db
        .update(todos)
        .set(update)
        .where(eq(todos.id, id))
        .returning();

    if (!task) {
        return c.json(
            { message: ReasonPhrases.NOT_FOUND },
            StatusCodes.NOT_FOUND
        );
    }

    return c.json(task, StatusCodes.OK);
};
