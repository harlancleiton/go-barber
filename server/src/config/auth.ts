export const authConfig = {
  jwt: {
    secret: String(process.env.APP_KEY),
    expiresIn: '3d',
  },
  bcrypt: {
    saltRounds: Number(process.env.PASSWORD_SALT_ROUNDS || 10),
  },
};
