export default () => ({
  postgres: {
    host: process.env.POSTGRES_HOST,
    portdb: parseInt(process.env.POSTGRES_PORT, 10),
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DATABASE,
  },
});
