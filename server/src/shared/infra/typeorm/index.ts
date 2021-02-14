import { createConnection as createConnectionTypeORM } from 'typeorm';

export async function createConnection() {
  await createConnectionTypeORM();
}
