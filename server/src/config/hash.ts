type HashType = 'bcrypt';

interface HashConfig {
  driver: HashType;
  bcrypt: { rounds: number };
}

export const hashConfig: HashConfig = {
  driver: 'bcrypt',
  // TODO add .env
  bcrypt: { rounds: 10 }
};
