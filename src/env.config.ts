
const env = {
  PORT: parseInt(`${process.env.PORT || 3000}`),
  DATABASE_URL: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017',
  API_KEY: process.env.API_KEY,
}

export { env }
