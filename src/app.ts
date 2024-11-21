import configureOpenAPI from '@/lib/configureOpenAPI';
import createApp from '@/lib/createApp';
import root from '@/routes/root.route';
import tasks from '@/routes/tasks';
import users from '@/routes/users';

const app = createApp();
const routes = [root, tasks, users];

configureOpenAPI(app);

routes.forEach((route) => app.route('/', route));

export default app;
