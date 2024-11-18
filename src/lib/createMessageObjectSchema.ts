import { z } from '@hono/zod-openapi';

const createMessageObjectSchema = (
  exampleMessage: string = '<example message>'
) => {
  return z
    .object({
      message: z.string(),
    })
    .openapi({
      example: {
        message: exampleMessage,
      },
    });
};

export default createMessageObjectSchema;
