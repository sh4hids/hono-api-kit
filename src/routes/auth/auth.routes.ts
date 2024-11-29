import { createRoute, z } from '@hono/zod-openapi';

import { selectUserSchema } from '@/db/schema';
import { unauthorizedSchema } from '@/lib/constants';
import createErrorSchema from '@/lib/createErrorSchema';
import HttpStatusCodes from '@/lib/httpStatusCodes';
import jsonContent from '@/lib/jsonContent';
import jsonContentRequired from '@/lib/jsonContentRequired';

const tags = ['Auth'];

export const login = createRoute({
  path: '/auth/login',
  method: 'post',
  request: {
    body: jsonContentRequired(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
      'Login credentials'
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        user: selectUserSchema,
        accessToken: z.string(),
      }),
      'The logged in user'
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      'Email or password is not correct'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(
        z.object({
          email: z.string().email(),
          password: z.string(),
        })
      ),
      'The validation error(s)'
    ),
  },
});

export const refreshAccessToken = createRoute({
  path: '/auth/refresh-token',
  method: 'post',
  request: {},
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        accessToken: z.string(),
      }),
      'The access token'
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      'Invalid refresh token'
    ),
  },
});

export type LoginRoute = typeof login;
export type RefereshAccessTokenRoute = typeof refreshAccessToken;
