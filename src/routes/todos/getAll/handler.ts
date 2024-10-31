import { StatusCodes } from 'http-status-codes';

import { AppRouteHandler } from '@/lib/types';
import { GetAllRoute } from '@/routes/todos/getAll/route';

export const getAllHandler: AppRouteHandler<GetAllRoute> = (c) => {
    return c.json(
        [
            {
                name: 'Learn Hono',
                isCompleted: false,
            },
        ],
        StatusCodes.OK
    );
};
