import { Request, Response } from 'express'

export const errorHandler = (err: any, req: Request, res: Response): void => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
}
