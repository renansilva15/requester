import fastify from 'fastify';
import { jobsRoute } from './routes/jobs.route';

const app = fastify();

jobsRoute.registerRoutes(app);

app.get('/', () => {
  return { status: 'OK' };
});

app.listen({ port: 3333 }).then((url) => {
  console.log(`Server listen at ${url}`);
});
