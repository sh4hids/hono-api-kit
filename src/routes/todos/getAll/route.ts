import { createRoute, z } from '@hono/zod-openapi';

import HttpStatusCodes from '@/lib/httpStatusCodes';
import jsonContent from '@/lib/jsonContent';
import { ApiTags } from '@/lib/types';

export const getAllRoute = createRoute({
    tags: ApiTags.Todos,
    method: 'get',
    path: '/todos',
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.array(
                z.object({
                    name: z.string(),
                    isCompleted: z.boolean(),
                })
            ),
            'List of todos'
        ),
    },
});

export type GetAllRoute = typeof getAllRoute;
