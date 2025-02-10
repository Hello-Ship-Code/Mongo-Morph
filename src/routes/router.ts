import { Router } from 'express'

import { basicGet } from '../controllers/user'

const useRouter = Router()

useRouter.route('/').get(basicGet)

export { useRouter }
