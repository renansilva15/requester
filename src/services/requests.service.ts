import { fork, ChildProcess } from 'child_process';
import { requestWorkerPath } from '../workers/request.worker';
import { Observer } from './jobs.service';
import { Job } from '@prisma/client';
import { prisma } from '../config/prisma';

class RequestsService implements Observer {
  constructor() {
    this.requestAll();
  }

  notify(job: Job): void {
    this.request(job);
  }

  private runningJobs: number[] = [];

  private async createChildProcessRequestWorker(job: Job): Promise<void> {
    if (!this.runningJobs.includes(job.id)) {
      const child: ChildProcess = fork(requestWorkerPath);

      child.send(job);

      child.on('message', (message: { jobId: number; status: string }) => {
        if (message.status === 'error') {
          this.runningJobs = this.runningJobs.filter(
            (id) => id !== message.jobId,
          );
        }
      });

      this.runningJobs.push(job.id);
    }
  }

  private async request(job: Job): Promise<void> {
    console.log(`request method called with Job ${job.name}`);

    await this.createChildProcessRequestWorker(job);
  }

  async requestAll(): Promise<void> {
    const jobs = await prisma.job.findMany({
      where: {
        id: { notIn: this.runningJobs },
      },
    });

    for (const job of jobs) {
      await this.request(job);
    }
  }
}

export const requestsService = new RequestsService();
