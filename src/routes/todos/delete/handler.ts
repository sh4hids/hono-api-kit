import { eq } from 'drizzle-orm';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import db from '@/db';
import { todos } from '@/db/schema';
import { AppRouteHandler } from '@/lib/types';
import { DeleteTodoRoute } from '@/routes/todos/delete/route';

export const deleteTodoHandler: AppRouteHandler<DeleteTodoRoute> = async (
    c
) => {
    const { id } = c.req.valid('param');

    const result = await db.delete(todos).where(eq(todos.id, id));

    if (result.rowsAffected === 0) {
        return c.json(
            { message: ReasonPhrases.NOT_FOUND },
            StatusCodes.NOT_FOUND
        );
    }

    return c.body(null, StatusCodes.NO_CONTENT);
};
