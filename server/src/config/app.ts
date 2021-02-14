interface AppConfig {
  appKey: string;
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
  paths: {
    tmpFolder: 'tmp',
    uploadsFolder: {
      path: 'uploads',
      concatWithTmpFolder: true
    }
  },
  uploadsRoute: '/public/uploads'
};
