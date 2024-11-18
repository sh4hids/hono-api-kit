import type { Hook } from '@hono/zod-openapi';
import { StatusCodes } from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        error: result.error,
      },
      StatusCodes.UNPROCESSABLE_ENTITY
    );
  }
};

export default defaultHook;
