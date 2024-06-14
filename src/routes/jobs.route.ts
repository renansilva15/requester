import { FastifyInstance } from 'fastify';
import { jobsController } from '../controllers/jobs.controller';

class JobsRoute {
  registerRoutes(app: FastifyInstance) {
    app.post('/jobs', async (request, reply) => {
      return jobsController.create(request, reply);
    });

    app.get('/jobs', async (request, reply) => {
      return jobsController.findAll(request, reply);
    });
  }
}

export const jobsRoute = new JobsRoute();
