import axios from 'axios';
import { prisma } from '../config/prisma';

class RequestsService {
  private runningJobs: number[] = [];

  async request() {
    const jobs = await prisma.job.findMany({
      where: {
        id: { notIn: this.runningJobs },
      },
    });

    console.log({ rjobs: this.runningJobs });
    console.log({ jobs });

    for (const job of jobs) {
      const intervalId = setInterval(async () => {
        try {
          const response = await axios.get(job.url);
          console.log(response.data);
        } catch (error) {
          console.error(`Error fetching URL ${job.url}:`, error);
          clearInterval(intervalId);
          this.runningJobs = this.runningJobs.filter((id) => id !== job.id);
        }
      }, job.interval);

      this.runningJobs.push(job.id);
    }
  }
}

export const requestsService = new RequestsService();
