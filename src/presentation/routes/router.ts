import { Router, type Response, type Express } from 'express'

import { loginController } from '../controllers/api/login-controller'
import { signupController } from '../controllers/api/signup-controller'
import { userController } from '../controllers/api/users-controllers'
// import { authMiddleware } from '../middlewares/auth-middleware'

const apiRouters = Router()

apiRouters.get('/users', userController)
apiRouters.post('/signup', signupController)
apiRouters.post('/login', loginController)

const appRouter = (app: Express) => {
  // app.use('/user', authMiddleware, protectedRoutes)
  app.use('/api', apiRouters)
  app.use((_, response: Response) => {
    response.redirect('/')
  })
}

export { appRouter }
