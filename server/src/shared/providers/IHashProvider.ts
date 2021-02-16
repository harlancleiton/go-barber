export interface IHashProvider {
  generate(payload: string, rounds?: number): Promise<string>;

  compare(payload: string, hashed: string): Promise<boolean>;
}
