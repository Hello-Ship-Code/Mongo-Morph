import dotenv from 'dotenv'

dotenv.config()

const env = {
  PORT: parseInt(process.env.PORT ?? '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL ?? 'mongodb://127.0.0.1:27017',
  // API_KEY: process.env.API_KEY ?? "",
}

export { env }
