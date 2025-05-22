import jwt, { type JwtPayload } from 'jsonwebtoken'

import { env } from '../../config/env.config'

interface DecodeUser extends JwtPayload {
  id: string
  userName: string
  email: string
}

export const setUser = (user: DecodeUser) => {
  return jwt.sign({ id: user.id, userName: user.userName, email: user.email }, env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

export const getUser = (token: string): DecodeUser | null => {
  try {
    if (!token) return null

    const decode = jwt.verify(token, env.JWT_SECRET) as JwtPayload

    if (decode && typeof decode === 'object' && 'id' in decode) {
      return decode as DecodeUser
    }

    return null
  } catch (error) {
    return null
  }
}
