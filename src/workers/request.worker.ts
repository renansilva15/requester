import { Job } from '@prisma/client';
import { handleFetchApiResponse } from '../helpers/handle-fetch-api-response';

export const requestWorkerPath = __filename;

process.on('message', async (job: Job) => {
  const intervalId = setInterval(async () => {
    try {
      const response = await handleFetchApiResponse(fetch(job.url));

      console.log(
        `Job ${JSON.stringify(job)} executed at ${new Date().toLocaleString('pt-BR')} response: ${response}`,
      );
    } catch (error) {
      console.error(
        `Error when fetching (STOPPING) Job ${JSON.stringify(job)} executed at ${new Date().toLocaleString('pt-BR')} error: ${error}`,
      );

      clearInterval(intervalId);

      if (process.send) {
        process.send({ jobId: job.id, status: 'error' });
      }
    }
  }, job.interval);
});
