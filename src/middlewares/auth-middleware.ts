import { RequestHandler } from 'express'

import HttpError from '../utils/HttpError'
import { getUser } from '../utils/JWT/auth'

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const cookieToken = req.cookies?.userToken
    const authHeader = req.headers.authorization
    const headerToken =
      authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

    const token = cookieToken || headerToken

    if (!token) {
      throw new HttpError('Authentication token not found', 401)
    }

    const user = getUser(token)

    if (!user) {
      throw new HttpError('Invalid or expired token', 403)
    }

    res.locals.user = user

    next()
  } catch (error) {
    next(error)
  }
}
