import type { Request, RequestHandler, Response } from 'express'

import HttpError from '../../utils/HttpError'
import { setUser } from '../../utils/JWT/auth'
import { userLoginTypes } from '../../utils/user/user-types'
import { userLogin } from '../services/user-login'

export const loginController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userData: userLoginTypes = req.body

    if (!userData) {
      res.redirect('/login')
      return
    }

    const user = await userLogin(userData)

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
    throw new HttpError(`${error}`, 501)
  }
}
