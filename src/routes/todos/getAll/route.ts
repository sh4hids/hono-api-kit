import { createRoute, z } from '@hono/zod-openapi';

import { selectTaskSchema } from '@/db/schema';
import HttpStatusCodes from '@/lib/httpStatusCodes';
import jsonContent from '@/lib/jsonContent';
import { ApiTags } from '@/lib/types';

export const getAllTodosRoute = createRoute({
    tags: ApiTags.Todos,
    method: 'get',
    path: '/todos',
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.array(selectTaskSchema),
            'List of todos'
        ),
    },
});

export type GetAllTodosRoute = typeof getAllTodosRoute;
