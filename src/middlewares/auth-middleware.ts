import { RequestHandler } from 'express'

import HttpError from '../utils/HttpError'
import { getUser } from '../utils/JWT/auth'

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    // 1. Safer check for header token
    const cookieToken = req.cookies?.userToken
    const authHeader = req.headers.authorization
    const headerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

    const token = cookieToken || headerToken

    // 2. Send a 401 error instead of redirecting (more API-friendly)
    if (!token) {
      throw new HttpError('Authentication token not found', 401)
    }

    const user = getUser(token)

    // 3. Explicit 403 if token is invalid
    if (!user) {
      throw new HttpError('Invalid or expired token', 403)
    }

    res.locals.user = user

    // 4. Use next(error) to respect centralized error handling
    next()
  } catch (error) {
    next(error) // this will trigger the error handling middleware
  }
}