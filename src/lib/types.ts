import { OpenAPIHono, RouteConfig, RouteHandler, z } from '@hono/zod-openapi';
import { PinoLogger } from 'hono-pino';

export interface AppBindings {
    Variables: {
        logger: PinoLogger;
    };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type ZodSchema =
    // @ts-expect-error allow union
    z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
    R,
    AppBindings
>;

export const ApiTags = {
    Root: ['Root'],
    Todos: ['Todos'],
};
