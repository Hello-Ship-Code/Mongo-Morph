import type { Request, RequestHandler, Response } from 'express'
import { ZodError } from 'zod'

import { userValidation } from '../../validation/user/user-validation'

import HttpError from '../../utils/HttpError'
import { userSignupTypes } from '../../utils/user/user-types'
import { userSignup } from '../services/user-signup'

export const signupController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, userName, password } = userValidation.parse(req.body as userSignupTypes)

    const user = await userSignup({ email, userName, password })

    res.status(201).json({
      message: 'User created successfully',
      user: {
        email: user.email,
        userName: user.userName,
        id: user.id,
      },
    })
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map((e) => `${e.path.join('.')} : ${e.message}`)
      res.status(400).json({ message: errors.join(', ') })
      return
    }

    const status = error instanceof HttpError ? error.statusCode : 500
    const message = error instanceof Error ? error.message : 'Something went wrong'

    res.status(status).json({ message })
  }
}
