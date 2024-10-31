import { AppOpenAPI } from '@/lib/types';

import pkj from '../../package.json';

export default function configureOpenAPI(app: AppOpenAPI) {
    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            version: pkj.version,
            title: 'Hono API Kit',
        },
    });
}
