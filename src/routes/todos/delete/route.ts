import { createRoute } from '@hono/zod-openapi';

import { notFoundSchema } from '@/lib/constants';
import createErrorSchema from '@/lib/createErrorSchema';
import HttpStatusCodes from '@/lib/httpStatusCodes';
import idParamsSchema from '@/lib/idParamSchema';
import jsonContent from '@/lib/jsonContent';
import { ApiTags } from '@/lib/types';

export const deleteTodoRoute = createRoute({
    tags: ApiTags.Todos,
    method: 'delete',
    path: '/todos/{id}',
    request: {
        params: idParamsSchema,
    },
    responses: {
        [HttpStatusCodes.NO_CONTENT]: {
            description: 'Task deleted successfully',
        },
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            'Task not found'
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(idParamsSchema),
            'Validation error'
        ),
    },
});

export type DeleteTodoRoute = typeof deleteTodoRoute;
