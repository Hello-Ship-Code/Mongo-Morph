import { prisma } from '../../config/db.config'

import HttpError from '../../utils/HttpError'
import { userCategory } from '../../utils/user/user-types'

export const userCategories = async (userData: userCategory) => {
  if (!userData) throw new HttpError('needed data', 404)

  try {
    return await prisma.categories.create({
      data: {
        name: userData.name,
        icon: userData.icon,
        description: userData.description,
      },
    })
  } catch (error) {
    throw new HttpError(`${error}`, 500)
  }
}
