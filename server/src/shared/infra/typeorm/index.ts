import { createConnection as createConnectionTypeORM } from 'typeorm';

export async function createConnection(): Promise<void> {
  await createConnectionTypeORM();
}
