import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ZodError, z } from 'zod';

expand(config());

const EnvSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'staging', 'test'])
        .default('development'),
    PORT: z.coerce.number().default(4567),
    LOG_LEVEL: z
        .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
        .default('info'),
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
