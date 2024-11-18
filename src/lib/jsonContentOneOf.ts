import type { ZodSchema } from '@/lib/types.ts';

import oneOf from './oneOf.js';

const jsonContentOneOf = <T extends ZodSchema>(
  schemas: T[],
  description: string
) => {
  return {
    content: {
      'application/json': {
        schema: {
          oneOf: oneOf(schemas),
        },
      },
    },
    description,
  };
};

export default jsonContentOneOf;
