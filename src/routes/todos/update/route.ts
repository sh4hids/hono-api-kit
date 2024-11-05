import { createRoute } from '@hono/zod-openapi';

import { insertTaskSchema, selectTaskSchema } from '@/db/schema';
import { notFoundSchema } from '@/lib/constants';
import createErrorSchema from '@/lib/createErrorSchema';
import HttpStatusCodes from '@/lib/httpStatusCodes';
import idParamsSchema from '@/lib/idParamSchema';
import jsonContent from '@/lib/jsonContent';
import jsonContentOneOf from '@/lib/jsonContentOneOf';
import jsonContentRequired from '@/lib/jsonContentRequired';
import { ApiTags } from '@/lib/types';

export const updateTodoRoute = createRoute({
    tags: ApiTags.Todos,
    method: 'patch',
    path: '/todos/{id}',
    request: {
        params: idParamsSchema,
        body: jsonContentRequired(insertTaskSchema, 'Update a task'),
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectTaskSchema, 'Updated task'),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            'Task not found'
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
            [
                createErrorSchema(insertTaskSchema),
                createErrorSchema(idParamsSchema),
            ],
            'Validation error'
        ),
    },
});

export type UpdateTodoRoute = typeof updateTodoRoute;
