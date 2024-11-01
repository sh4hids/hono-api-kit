import jsonContent from '@/lib/jsonContent.js';
import type { ZodSchema } from '@/lib/types.ts';

const jsonContentRequired = <T extends ZodSchema>(
    schema: T,
    description: string
) => {
    return {
        ...jsonContent(schema, description),
        required: true,
    };
};

export default jsonContentRequired;
