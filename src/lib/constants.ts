import { ReasonPhrases } from 'http-status-codes';

import createMessageObjectSchema from '@/lib/createMessageObjectSchema';

export const notFoundSchema = createMessageObjectSchema(
    ReasonPhrases.NOT_FOUND
);
