import { Router, type Response, type Express } from 'express'

import { categoriesController } from '../controllers/api/categories-controller'
import { loginController } from '../controllers/api/login-controller'
import { signupController } from '../controllers/api/signup-controller'
import { userCategoriesController } from '../controllers/api/user-categories-controller'
import { userController } from '../controllers/api/users-controllers'
import { authMiddleware } from '../middlewares/auth-middleware'

const protectedRoutes = Router()
protectedRoutes.post('/categories', categoriesController)
protectedRoutes.get('/friends', userController)
protectedRoutes.post('/usercats', userCategoriesController)

const apiRouters = Router()

apiRouters.post('/signup', signupController)
apiRouters.post('/login', loginController)

const appRouter = (app: Express) => {
  app.use('/user', authMiddleware, protectedRoutes)
  app.use('/api', apiRouters)
  app.use((_, response: Response) => {
    response.redirect('/')
  })
}

export { appRouter }