import { RequestHandler } from 'express'

import { prisma } from '../../config/db.config'

import HttpError from '../../utils/HttpError'

export const userCategoriesController: RequestHandler = async (req, res) => {
  try {
    const userId = res.locals.user?.id

    if (!userId) res.redirect('/login')

    const catsIds: string[] = req.body.categoriesIds

    // console.log(catsIds)
    if (!catsIds || catsIds.length !== 10) {
      throw new HttpError('Please select exactly 10 categories', 400)
    }

    const existingCount = await prisma.userCategory.count({
      where: { userId },
    })

    if (existingCount >= 10) {
      throw new HttpError('You have already selected your 10 categories', 409)
    }

    const data = catsIds.map((categoryId) => ({
      userId,
      categoryId,
    }))

    await prisma.userCategory.createMany({ data })

    res.status(201).json({ message: 'Categories selected successfully' })
  } catch (error) {
    throw new HttpError(`${error}`, 500)
  }
}