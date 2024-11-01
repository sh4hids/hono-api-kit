import { createRoute } from '@hono/zod-openapi';

import { insertTaskSchema, selectTaskSchema } from '@/db/schema';
import createErrorSchema from '@/lib/createErrorSchema';
import HttpStatusCodes from '@/lib/httpStatusCodes';
import jsonContent from '@/lib/jsonContent';
import jsonContentRequired from '@/lib/jsonContentRequired';
import { ApiTags } from '@/lib/types';

export const createTodoRoute = createRoute({
    tags: ApiTags.Todos,
    method: 'post',
    path: '/todos',
    request: {
        body: jsonContentRequired(insertTaskSchema, 'New task'),
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectTaskSchema, 'New task'),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(insertTaskSchema),
            'Validation error'
        ),
    },
});

export type CreateTodoRoute = typeof createTodoRoute;
