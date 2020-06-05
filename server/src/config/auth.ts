export default {
  jwt: {
    secret: String(process.env.APP_KEY),
    expiresIn: '3d',
  },
  bcrypt: {
    saltRounds: String(process.env.PASSWORD_SALT_ROUNDS || 10),
  },
};
