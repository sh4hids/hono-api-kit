import { eq } from 'drizzle-orm';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import db from '@/db';
import { users } from '@/db/schema';
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants';
import type { AppRouteHandler } from '@/lib/types';
import { encryptPassword } from '@/lib/utils';
import type {
  CreateRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
  RemoveRoute,
} from '@/routes/users/users.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const users = await db.query.users.findMany({
    columns: {
      password: false,
    },
  });
  return c.json(users, StatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const user = c.req.valid('json');
  const hashedPassword = await encryptPassword(user.password);

  user.password = hashedPassword;

  const [inserted] = await db.insert(users).values(user).returning();

  const { password: _password, ...newUser } = inserted;

  return c.json(newUser, StatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const user = await db.query.users.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
    columns: {
      password: false,
    },
  });

  if (!user) {
    return c.json(
      {
        message: ReasonPhrases.NOT_FOUND,
      },
      StatusCodes.NOT_FOUND
    );
  }

  return c.json(user, StatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const updates = c.req.valid('json');

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: 'ZodError',
        },
      },
      StatusCodes.UNPROCESSABLE_ENTITY
    );
  }

  const [user] = await db
    .update(users)
    .set(updates)
    .where(eq(users.id, id))
    .returning();

  if (!user) {
    return c.json(
      {
        message: ReasonPhrases.NOT_FOUND,
      },
      StatusCodes.NOT_FOUND
    );
  }

  return c.json(user, StatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const result = await db.delete(users).where(eq(users.id, id));

  if (result.rowsAffected === 0) {
    return c.json(
      {
        message: ReasonPhrases.NOT_FOUND,
      },
      StatusCodes.NOT_FOUND
    );
  }

  return c.body(null, StatusCodes.NO_CONTENT);
};
