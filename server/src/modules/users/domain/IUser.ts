export interface IUser {
  id: string;

  firstname: string;

  lastname: string;

  fullname: string;

  email: string;

  password: string;

  avatar: string | null;

  createdAt: Date;

  updatedAt: Date;
}
