import { IStorageProvider } from '../IStorageProvider';

export class FakeStorageProvider implements IStorageProvider {
  async save(file: string): Promise<string> {
    return file;
  }

  async delete(): Promise<void> {
    return;
  }
}
