import { prisma } from '../../config/db.config'

import HttpError from '../../utils/HttpError'

export const getUsers = async () => {
  try {
    return await prisma.user.findMany()
  } catch (error) {
    throw new HttpError(`${error}`, 500)
  }
}
