import type { NotFoundHandler } from 'hono';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const notFound: NotFoundHandler = (c) => {
    return c.json(
        {
            message: `${ReasonPhrases.NOT_FOUND} - ${c.req.path}`,
        },
        StatusCodes.NOT_FOUND
    );
};
