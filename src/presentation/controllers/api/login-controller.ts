import type { Request, RequestHandler, Response } from 'express'

import HttpError from '../../utils/HttpError'
import { setUser } from '../../utils/JWT/auth'
import { userLoginTypes } from '../../utils/user/user-types'
import { userLogin } from '../services/user-login'

export const loginController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as userLoginTypes

    if (!email || !password) {
      const missingFields = []
      if (!email) missingFields.push('email')
      if (!password) missingFields.push('password')

      res.status(400).json({
        message: `${missingFields.join(' and ')} ${missingFields.length > 1 ? 'are' : 'is'} required`,
      })
    }

    const user = await userLogin({ email, password })

    if (!user) {
      res.redirect('/login')
      return
    }

    // res.cookie('userToken', setUser(user))
    const token = setUser(user)

    res.setHeader('Authorization', `bearer ${token}`)

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
      },
    })
  } catch (error) {
    const status = error instanceof HttpError ? error.statusCode : 500
    const message = error instanceof Error ? error.message : 'Something went wrong'

    res.status(status).json({ message })
  }
}
