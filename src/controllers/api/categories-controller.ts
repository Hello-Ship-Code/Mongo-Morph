import { RequestHandler } from 'express'

import HttpError from '../../utils/HttpError'
import { userCategory } from '../../utils/user/user-types'
import { userCategories } from '../services/user-categories'

export const categoriesController: RequestHandler = async (req, res, next) => {
  try {
    const userData: userCategory = req.body

    if (!userData) throw new HttpError('why is this like this!!!', 404)

    const newCategory = await userCategories(userData)

    res.status(201).json({ message: 'Category created', category: newCategory })
  } catch (error) {
    next(error) // So your global error handler can catch it
  }
}
