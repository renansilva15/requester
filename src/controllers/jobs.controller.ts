import { jobsService } from '../services/jobs.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createJobSchema } from '../validations/job.schema';
import { handleError } from '../helpers/handle-error';

class JobsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createJobDto = createJobSchema.parse(request.body);

      const response = await jobsService.create(createJobDto);

      return reply.code(201).send(response);
    } catch (error) {
      handleError(error, reply);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const response = await jobsService.findAll();

      console.log(response);

      return reply.send(response);
    } catch (error) {
      handleError(error, reply);
    }
  }
}

export const jobsController = new JobsController();
