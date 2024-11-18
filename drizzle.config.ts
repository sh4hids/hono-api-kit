import { defineConfig } from 'drizzle-kit';

import env from '@/env';

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema',
  out: './src/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
