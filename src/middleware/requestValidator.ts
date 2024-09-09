import { Request, Response, NextFunction } from 'express'
import { TodoSchema } from '../types/todo'

export const requestValidator = (req: Request, res: Response, next: NextFunction): void => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body) {
      res.status(400).send('Request body is missing!')
      return
    }
    try {
      TodoSchema.parse(req.body)
    } catch (error) {
      res.status(400).send(error)
      return
    }
  }
  next()
}
