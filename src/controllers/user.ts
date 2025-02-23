import { type Request, type Response } from 'express'

const basicGet = async (_req: Request, res: Response) => {
  console.log('Hi from /test HomePage')

  res.end('Hi from /test HomePage')
}

export { basicGet }
