import type { ErrorHandler } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';
import { StatusCodes } from 'http-status-codes';

const onError: ErrorHandler = (err, c) => {
    const currentStatus =
        'status' in err ? err.status : c.newResponse(null).status;
    const statusCode =
        currentStatus !== StatusCodes.OK
            ? (currentStatus as StatusCode)
            : StatusCodes.INTERNAL_SERVER_ERROR;
    const env = c.env?.NODE_ENV || process.env?.NODE_ENV;
    return c.json(
        {
            message: err.message,

            stack: env === 'production' ? undefined : err.stack,
        },
        statusCode
    );
};

export default onError;
