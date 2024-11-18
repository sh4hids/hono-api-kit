import { createRoute } from '@hono/zod-openapi';
import { StatusCodes } from 'http-status-codes';

import { createRouter } from '@/lib/createApp';
import createMessageObjectSchema from '@/lib/createMessageObjectSchema';
import HttpStatusCodes from '@/lib/httpStatusCodes';
import jsonContent from '@/lib/jsonContent';
import { ApiTags } from '@/lib/types';

const router = createRouter().openapi(
  createRoute({
    tags: ApiTags.Root,
    method: 'get',
    path: '/ping',
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema('Pong!'),
        'Health check'
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: 'Pong!',
      },
      StatusCodes.OK
    );
  }
);

export default router;
