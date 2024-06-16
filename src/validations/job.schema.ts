import z from 'zod';

export const createJobSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  interval: z.number(),
});
