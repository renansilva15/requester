import fastify from 'fastify';

const app = fastify();

app.get('/', () => {
  return { status: 'OK' };
});

app.listen({ port: 3333 }).then((url) => {
  console.log(`Server listen at ${url}`);
});
