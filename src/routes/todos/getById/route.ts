import { createRoute } from '@hono/zod-openapi';

import { selectTaskSchema } from '@/db/schema';
import { notFoundSchema } from '@/lib/constants';
import createErrorSchema from '@/lib/createErrorSchema';
import HttpStatusCodes from '@/lib/httpStatusCodes';
import idParamsSchema from '@/lib/idParamSchema';
import jsonContent from '@/lib/jsonContent';
import { ApiTags } from '@/lib/types';

export const getByIdTodoRoute = createRoute({
    tags: ApiTags.Todos,
    method: 'get',
    path: '/todos/{id}',
    request: {
        params: idParamsSchema,
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectTaskSchema, 'New task'),
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

export type GetByIdTodoRoute = typeof getByIdTodoRoute;
