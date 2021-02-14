export class CreateUserDto {
  firstname: string;

  lastname: string;

  email: string;

  password: string;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
