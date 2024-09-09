import { Request, Response, NextFunction } from 'express'

export const logger = (req: Request, res: Response, next: NextFunction): void => {
  console.log(
    `Got a request with method: ${req.method} | endpoint: ${req.url} | params: ${JSON.stringify(req.params)} | body: ${JSON.stringify(req.body)}`
  )
  next()
}
