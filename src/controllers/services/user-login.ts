import { prisma } from '../../config/db.config'

import HttpError from '../../utils/HttpError'
import { verifyPassword } from '../../utils/user/password-hashing'
import { userLoginTypes } from '../../utils/user/user-types'

export const userLogin = async (userData: userLoginTypes) => {
  try {
    if (!userData) throw new HttpError('we need data to login', 404)

    const user = await prisma.user.findFirst({
      where: { email: userData.email },
      select: {
        id: true,
        email: true,
        userName: true,
        password: true,
      },
    })

    if (!user || !(await verifyPassword(userData.password, user.password))) {
      throw new HttpError('Invalid email or password', 401)
    }

    const { password, ...safeUser } = user
    return safeUser
  } catch (error) {
    throw new HttpError(`${error}`, 501)
  }
}
