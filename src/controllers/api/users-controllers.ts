import { RequestHandler } from 'express'

import HttpError from '../../utils/HttpError'
import { getUsers } from '../services/get-users'

export const userController: RequestHandler = async (_req, res) => {
  try {
    const users = await getUsers()
    res.send(users)
  } catch (error) {
    throw new HttpError(`${error}`, 5000)
  }
}
