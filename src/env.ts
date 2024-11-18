import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ZodError, z } from 'zod';

expand(config());

const EnvSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'production', 'staging', 'test'])
      .default('development'),
    PORT: z.coerce.number().default(4567),
    LOG_LEVEL: z
      .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
      .default('info'),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === 'production' && !input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'undefined',
        path: ['DATABASE_AUTH_TOKEN'],
        message: "Must be set when NODE_ENV is 'production'",
      });
    }
  });

type Env = z.infer<typeof EnvSchema>;

let env: Env;

try {
  env = EnvSchema.parse(process.env);
} catch (err) {
  const error = err as ZodError;
  console.log('Invalid env ');
  console.error(error.flatten());

  process.exit(1);
}

export default env;
