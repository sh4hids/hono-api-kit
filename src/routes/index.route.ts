import { createRoute, z } from '@hono/zod-openapi';

import { createRouter } from '@/lib/createApp';

const router = createRouter().openapi(
    createRoute({
        method: 'get',
        path: '/ping',
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: z.object({
                            message: z.string(),
                        }),
                    },
                },
                description: 'Health check',
            },
        },
    }),
    (c) => {
        return c.json({
            message: 'Pong!',
        });
    }
);

export default router;
