import 'reflect-metadata';
import { HttpServer } from './shared/infra/http/server';
import { createConnection } from './shared/infra/typeorm';

async function bootstrap() {
  await createConnection();

  const server = new HttpServer();
  server.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('Server started on port 3333!');
  });
}

bootstrap();
