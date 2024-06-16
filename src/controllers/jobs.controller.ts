import { Prisma } from '@prisma/client';
import { jobsService } from '../services/jobs.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { requestsService } from '../services/requests.service';

class JobsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createJobDto = request.body as Prisma.JobCreateInput;

      const response = await jobsService.create(createJobDto);

      await requestsService.request();

      return reply.code(201).send(response);
    } catch (error) {}
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const response = await jobsService.findAll();

      return reply.send(response);
    } catch (error) {}
  }
}

export const jobsController = new JobsController();
