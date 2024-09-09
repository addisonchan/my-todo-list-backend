import { Request, Response, NextFunction } from 'express'
import { requestValidator } from './requestValidator'
import { TodoSchema } from '../types/todo'

jest.mock('../types/todo', () => ({
  TodoSchema: {
    parse: jest.fn()
  }
}))

describe('requestValidator', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction

  beforeEach(() => {
    req = {
      method: '',
      body: {}
    }
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }
    next = jest.fn()
  })

  it('should return 400 if request body is missing for POST method', () => {
    req.method = 'POST'
    req.body = undefined

    requestValidator(req as Request, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith('Request body is missing!')
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 400 if request body is missing for PUT method', () => {
    req.method = 'PUT'
    req.body = undefined

    requestValidator(req as Request, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith('Request body is missing!')
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 400 if request body is invalid for POST method', () => {
    req.method = 'POST'
    req.body = { invalid: 'data' }
    ;(TodoSchema.parse as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid body')
    })

    requestValidator(req as Request, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith(new Error('Invalid body'))
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next if request body is valid for POST method', () => {
    req.method = 'POST'
    req.body = { valid: 'data' }
    ;(TodoSchema.parse as jest.Mock).mockImplementation(() => {})

    requestValidator(req as Request, res as Response, next)

    expect(TodoSchema.parse).toHaveBeenCalledWith(req.body)
    expect(next).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
    expect(res.send).not.toHaveBeenCalled()
  })

  it('should call next if request method is neither POST nor PUT', () => {
    req.method = 'GET'

    requestValidator(req as Request, res as Response, next)

    expect(next).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
    expect(res.send).not.toHaveBeenCalled()
  })
})
