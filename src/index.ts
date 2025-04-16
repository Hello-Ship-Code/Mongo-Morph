import express from 'express'

import { env } from './config/env.config'

import { appRouter } from './routes/router'

const app = express()

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

appRouter(app)

// Server
app.listen(env.PORT, () => console.log(`Server is running on port ${env.PORT}`))
