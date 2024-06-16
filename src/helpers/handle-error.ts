import { FastifyReply } from 'fastify';
import { ZodError } from 'zod';

export function handleError(error: unknown, reply: FastifyReply) {
  const httpResponse: {
    statusCode: number;
    response: { message: string; error: any };
  } = {
    statusCode: 500,
    response: { message: 'Internal Server Error', error },
  };

  console.error(error);

  if (error instanceof ZodError) {
    httpResponse.statusCode = 400;
    httpResponse.response.message = 'Bad Request';
    httpResponse.response.error = error.flatten();
  }

  return reply.code(httpResponse.statusCode).send(httpResponse.response);
}
