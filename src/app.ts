import configureOpenAPI from '@/lib/configureOpenAPI';
import createApp from '@/lib/createApp';
import root from '@/routes/root.route';
import tasks from '@/routes/tasks';

const app = createApp();
const routes = [root, tasks];

configureOpenAPI(app);

routes.forEach((route) => app.route('/', route));

export default app;
