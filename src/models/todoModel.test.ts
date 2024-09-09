import { getTodos, addTodo, updateTodo, deleteTodo } from './todoModel'
import { insertTodos, queryTodos, deleteTodos, updateTodos } from './dataSource'
import { Todo } from '../types/todo'

// Mock the functions from dataSource
jest.mock('./dataSource', () => ({
  insertTodos: jest.fn(),
  queryTodos: jest.fn(),
  deleteTodos: jest.fn(),
  updateTodos: jest.fn()
}))

describe('todoModel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getTodos', () => {
    it('should return todos when query is successful', async () => {
      const mockTodos: Todo[] = [
        { id: '1', text: 'Learn TypeScript', isDone: false },
        { id: '2', text: 'Build a REST API', isDone: true }
      ]

      ;(queryTodos as jest.Mock).mockResolvedValueOnce(mockTodos)

      const result = await getTodos()
      expect(result).toEqual(mockTodos)
      expect(queryTodos).toHaveBeenCalled()
    })

    it('should throw an error when query fails', async () => {
      const mockError = new Error('Database fetch failed')
      ;(queryTodos as jest.Mock).mockRejectedValueOnce(mockError)

      await expect(getTodos()).rejects.toThrow('Database fetch failed')
      expect(queryTodos).toHaveBeenCalled()
    })
  })

  describe('addTodo', () => {
    it('should add a todo when insert is successful', async () => {
      const newTodo: Todo = { id: '3', text: 'Write tests', isDone: false }

      await addTodo(newTodo)
      expect(insertTodos).toHaveBeenCalledWith(newTodo)
    })

    it('should throw an error when insert fails', async () => {
      const newTodo: Todo = { id: '3', text: 'Write tests', isDone: false }
      const mockError = new Error('Database insert failed')
      ;(insertTodos as jest.Mock).mockRejectedValueOnce(mockError)

      await expect(addTodo(newTodo)).rejects.toThrow('Database insert failed')
      expect(insertTodos).toHaveBeenCalledWith(newTodo)
    })
  })

  describe('updateTodo', () => {
    it('should update a todo when update is successful', async () => {
      const updatedTodo: Todo = { id: '1', text: 'Learn TypeScript', isDone: true }

      await updateTodo('1', updatedTodo)
      expect(updateTodos).toHaveBeenCalledWith('1', updatedTodo)
    })

    it('should throw an error when update fails', async () => {
      const updatedTodo: Todo = { id: '1', text: 'Learn TypeScript', isDone: true }
      const mockError = new Error('Database update failed')
      ;(updateTodos as jest.Mock).mockRejectedValueOnce(mockError)

      await expect(updateTodo('1', updatedTodo)).rejects.toThrow('Database update failed')
      expect(updateTodos).toHaveBeenCalledWith('1', updatedTodo)
    })
  })

  describe('deleteTodo', () => {
    it('should delete a todo when delete is successful', async () => {
      await deleteTodo('1')
      expect(deleteTodos).toHaveBeenCalledWith('1')
    })

    it('should throw an error when delete fails', async () => {
      const mockError = new Error('Database delete failed')
      ;(deleteTodos as jest.Mock).mockRejectedValueOnce(mockError)

      await expect(deleteTodo('1')).rejects.toThrow('Database delete failed')
      expect(deleteTodos).toHaveBeenCalledWith('1')
    })
  })
})
