import { IHashProvider } from '../IHashProvider';

export class FakeHashProvider implements IHashProvider {
  generate(payload: string): Promise<string> {
    return Promise.resolve(payload);
  }

  compare(payload: string, hashed: string): Promise<boolean> {
    return Promise.resolve(payload === hashed);
  }
}
