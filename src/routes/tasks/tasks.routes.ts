import { createRoute, z } from '@hono/zod-openapi';

import {
  insertTasksSchema,
  patchTasksSchema,
  selectTasksSchema,
} from '@/db/schema';
import { notFoundSchema } from '@/lib/constants';
import createErrorSchema from '@/lib/createErrorSchema';
import HttpStatusCodes from '@/lib/httpStatusCodes';
import IdParamsSchema from '@/lib/idParamsSchema';
import jsonContent from '@/lib/jsonContent';
import jsonContentRequired from '@/lib/jsonContentRequired';

const tags = ['Tasks'];

export const list = createRoute({
  path: '/tasks',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTasksSchema),
      'The list of tasks'
    ),
  },
});

export const create = createRoute({
  path: '/tasks',
  method: 'post',
  request: {
    body: jsonContentRequired(insertTasksSchema, 'The task to create'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'The created task'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      'The validation error(s)'
    ),
  },
});

export const getOne = createRoute({
  path: '/tasks/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'The requested task'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
});

export const patch = createRoute({
  path: '/tasks/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchTasksSchema, 'The task updates'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'The updated task'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchTasksSchema).or(createErrorSchema(IdParamsSchema)),
      'The validation error(s)'
    ),
  },
});

export const remove = createRoute({
  path: '/tasks/{id}',
  method: 'delete',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'Task deleted',
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
