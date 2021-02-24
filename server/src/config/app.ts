interface AppConfig {
  appKey: string;
  forgotPasswordTokenExpiresIn: number;
  paths: {
    tmpFolder: string;
    uploadsFolder: {
      path: string;
      concatWithTmpFolder: boolean;
    };
  };
  uploadsRoute: string;
}

export const appConfig: AppConfig = {
  // TODO add env
  appKey: 'gEBQpEpiHn5QS4zZQ8XcNCGbuAVbM6gT',
  forgotPasswordTokenExpiresIn: 2,
  paths: {
    tmpFolder: 'tmp',
    uploadsFolder: {
      path: 'uploads',
      concatWithTmpFolder: true
    }
  },
  uploadsRoute: '/public/uploads'
};
