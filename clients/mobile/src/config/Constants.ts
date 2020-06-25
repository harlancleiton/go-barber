import Constants from 'expo-constants';

interface EnvProps {
  apiUrl: string;
  devHost: string | undefined;
}

const ENV: { [key: string]: EnvProps } = {
  dev: {
    apiUrl: 'http://172.16.0.59:3333',
    devHost: '172.16.0.59',
  },
  staging: {
    apiUrl: 'https://staging.gobarber.com.br',
    devHost: undefined,
  },
  prod: {
    apiUrl: 'https://app.consultai.com.br',
    devHost: undefined,
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel): EnvProps => {
  if (__DEV__) return ENV.dev;

  switch (env) {
    case 'staging':
      return ENV.staging;
    case 'prod':
    default:
      return ENV.prod;
  }
};

export default getEnvVars();
