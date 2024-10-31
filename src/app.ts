import configureOpenAPI from '@/lib/configureOpenAPI';
import createApp from '@/lib/createApp';
import root from '@/routes/root.route';
import todos from '@/routes/todos';

const app = createApp();
const routes = [root, todos];

configureOpenAPI(app);

routes.forEach((route) => app.route('/', route));

export default app;
