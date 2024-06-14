import { Job, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

class JobsService {
  async create(createJobDto: Prisma.JobCreateInput): Promise<Job> {
    return prisma.job.create({ data: createJobDto });
  }

  async findAll(): Promise<Job[]> {
    return prisma.job.findMany();
  }
}

export const jobsService = new JobsService();
