interface User {
  id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SignOptions {
  expiresIn?: string | number;
  notBefore?: string | number;
  subject?: string;
  issuer?: string;
}

interface AuthConfig {
  jwt: {
    uid: keyof User;
    options: SignOptions & { secret: string };
  };
}

export const authConfig: AuthConfig = {
  jwt: {
    uid: 'id',
    // TODO add env
    options: {
      secret: 'gEBQpEpiHn5QS4zZQ8XcNCGbuAVbM6gT',
      expiresIn: '1d',
      issuer: 'GoBarber'
    }
  }
};
