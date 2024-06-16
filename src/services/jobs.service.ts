import { Job, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { requestsService } from './requests.service';

export interface Observer {
  notify(job: Job): void;
}

class JobsService {
  private observers: Observer[] = [];

  private notifyObservers(job: Job): void {
    for (const observer of this.observers) {
      observer.notify(job);
    }
  }

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  async create(createJobDto: Prisma.JobCreateInput): Promise<Job> {
    const newJob = await prisma.job.create({ data: createJobDto });

    this.notifyObservers(newJob);

    return newJob;
  }

  async findAll(): Promise<Job[]> {
    return prisma.job.findMany();
  }
}

export const jobsService = new JobsService();

jobsService.addObserver(requestsService);
