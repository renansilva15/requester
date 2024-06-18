import 'dotenv/config';
import fastify from 'fastify';
import { jobsRoute } from './routes/jobs.route';

const HOST = process.env.HOST ?? '0.0.0.0';
const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = fastify({ logger: true });

jobsRoute.registerRoutes(app);

app.get('/', () => {
  return { status: 'OK' };
});

app.listen({ host: HOST, port: PORT }).then((url) => {
  console.log(`Server listen at ${url}`);
});
