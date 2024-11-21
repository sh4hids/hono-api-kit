import { createRoute, z } from '@hono/zod-openapi';

import {
  insertUserSchema,
  patchUserSchema,
  selectUserSchema,
} from '@/db/schema';
import { notFoundSchema } from '@/lib/constants';
import createErrorSchema from '@/lib/createErrorSchema';
import HttpStatusCodes from '@/lib/httpStatusCodes';
import IdParamsSchema from '@/lib/idParamsSchema';
import jsonContent from '@/lib/jsonContent';
import jsonContentRequired from '@/lib/jsonContentRequired';

const tags = ['Users'];

export const list = createRoute({
  path: '/users',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectUserSchema),
      'The list of users'
    ),
  },
});

export const create = createRoute({
  path: '/users',
  method: 'post',
  request: {
    body: jsonContentRequired(insertUserSchema, 'The user to create'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectUserSchema, 'The created user'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertUserSchema),
      'The validation error(s)'
    ),
  },
});

export const getOne = createRoute({
  path: '/users/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectUserSchema, 'The requested user'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'User not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
});

export const patch = createRoute({
  path: '/user/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchUserSchema, 'The user updates'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectUserSchema, 'The updated user'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'User not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchUserSchema).or(createErrorSchema(IdParamsSchema)),
      'The validation error(s)'
    ),
  },
});

export const remove = createRoute({
  path: '/users/{id}',
  method: 'delete',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'User deleted',
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'User not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
});

export type CreateRoute = typeof create;
export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
