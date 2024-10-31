import configureOpenAPI from '@/lib/configureOpenAPI';
import createApp from '@/lib/createApp';
import root from '@/routes/index.route';

const app = createApp();
const routes = [root];

configureOpenAPI(app);

routes.forEach((route) => app.route('/', route));

export default app;
