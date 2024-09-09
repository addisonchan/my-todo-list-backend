import { Request, Response, NextFunction } from 'express'
import { getAllTodos, createTodo, updateTodoById, deleteTodoById } from './todoController'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../models/todoModel'
import { Todo } from '../types/todo'
import { PostgresError } from 'postgres'

// Mock the functions from todoModel
jest.mock('../models/todoModel', () => ({
  getTodos: jest.fn(),
  addTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn()
}))

// Mock the PostgresError class
jest.mock('postgres', () => ({
  PostgresError: class PostgresError extends Error {
    code: string

    constructor(message: string, code: string) {
      super(message)
      this.code = code
    }
  }
}))

describe('todoController', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction

  beforeEach(() => {
    req = {}
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    }
    next = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllTodos', () => {
    it('should return all todos when query is successful', async () => {
      const mockTodos: Todo[] = [
        { id: '1', text: 'Learn TypeScript', isDone: false },
        { id: '2', text: 'Build a REST API', isDone: true }
      ]

      ;(getTodos as jest.Mock).mockResolvedValueOnce(mockTodos)

      await getAllTodos(req as Request, res as Response, next)

      expect(getTodos).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith(mockTodos)
    })

    it('should call next with error when query fails', async () => {
      const mockError = new Error('Database fetch failed')
      ;(getTodos as jest.Mock).mockRejectedValueOnce(mockError)

      await getAllTodos(req as Request, res as Response, next)

      expect(getTodos).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(mockError)
    })
  })

  describe('createTodo', () => {
    it('should create a new todo when insert is successful', async () => {
      const newTodo: Todo = { id: '3', text: 'Write tests', isDone: false }
      req.body = newTodo

      await createTodo(req as Request, res as Response, next)

      expect(addTodo).toHaveBeenCalledWith(newTodo)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(newTodo)
    })

    it('should return 400 when todo id is already in use', async () => {
      const newTodo: Todo = { id: '3', text: 'Write tests', isDone: false }
      req.body = newTodo
      const mockError = new PostgresError('Unique violation')
      mockError.code = '23505'
      ;(addTodo as jest.Mock).mockRejectedValueOnce(mockError)

      await createTodo(req as Request, res as Response, next)

      expect(addTodo).toHaveBeenCalledWith(newTodo)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith(`Todo id ${newTodo.id} is already in use!`)
    })

    it('should call next with error when insert fails', async () => {
      const newTodo: Todo = { id: '3', text: 'Write tests', isDone: false }
      req.body = newTodo
      const mockError = new Error('Database insert failed')
      ;(addTodo as jest.Mock).mockRejectedValueOnce(mockError)

      await createTodo(req as Request, res as Response, next)

      expect(addTodo).toHaveBeenCalledWith(newTodo)
      expect(next).toHaveBeenCalledWith(mockError)
    })
  })

  describe('updateTodoById', () => {
    it('should update a todo when update is successful', async () => {
      const updatedTodo: Todo = { id: '1', text: 'Learn TypeScript', isDone: true }
      req.params = { id: '1' }
      req.body = updatedTodo

      await updateTodoById(req as Request, res as Response, next)

      expect(updateTodo).toHaveBeenCalledWith('1', updatedTodo)
      expect(res.json).toHaveBeenCalledWith(updatedTodo)
    })

    it('should call next with error when update fails', async () => {
      const updatedTodo: Todo = { id: '1', text: 'Learn TypeScript', isDone: true }
      req.params = { id: '1' }
      req.body = updatedTodo
      const mockError = new Error('Database update failed')
      ;(updateTodo as jest.Mock).mockRejectedValueOnce(mockError)

      await updateTodoById(req as Request, res as Response, next)

      expect(updateTodo).toHaveBeenCalledWith('1', updatedTodo)
      expect(next).toHaveBeenCalledWith(mockError)
    })
  })

  describe('deleteTodoById', () => {
    it('should delete a todo when delete is successful', async () => {
      req.params = { id: '1' }

      await deleteTodoById(req as Request, res as Response, next)

      expect(deleteTodo).toHaveBeenCalledWith('1')
      expect(res.status).toHaveBeenCalledWith(204)
      expect(res.send).toHaveBeenCalled()
    })

    it('should call next with error when delete fails', async () => {
      req.params = { id: '1' }
      const mockError = new Error('Database delete failed')
      ;(deleteTodo as jest.Mock).mockRejectedValueOnce(mockError)

      await deleteTodoById(req as Request, res as Response, next)

      expect(deleteTodo).toHaveBeenCalledWith('1')
      expect(next).toHaveBeenCalledWith(mockError)
    })
  })
})
