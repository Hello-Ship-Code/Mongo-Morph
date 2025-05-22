import { prisma } from '../../config/db.config'

import HttpError from '../../utils/HttpError'
import { hashPassword } from '../../utils/user/password-hashing'
import { userSignupTypes } from '../../utils/user/user-types'

export const userSignup = async (userData: userSignupTypes) => {
  try {
    if (!userData) throw new HttpError('Where are the details man', 404)

    const hashedPassword = await hashPassword(userData.password)

    return prisma.user.create({
      data: {
        email: userData.email,
        userName: userData.userName,
        password: hashedPassword,
      },
    })
  } catch (error) {
    throw new HttpError(`${error}`, 404)
  }
}
