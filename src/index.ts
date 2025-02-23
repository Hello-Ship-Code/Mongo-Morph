import express, { type Request, type Response } from 'express'
import { connect } from 'mongoose'

import { env } from './env.config'

import { useRouter } from './routes/router'

const app = express()

app.use('/test', useRouter)

app.get('/', (_req: Request, res: Response) => {
  res.end('Hello from Home Page')
})

// Database Connection
connect(env.DATABASE_URL).then(() => console.log(`connected to DataBase...`))

// Server
app.listen(env.PORT, () => console.log(`Server is running on port ${env.PORT}`))
