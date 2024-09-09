import { queryTodos, insertTodos, updateTodos, deleteTodos } from './dataSource'
import { mockTodos } from '../setupTests'

describe('queryTodos', () => {
  test('should return todos when query is successful', async () => {
    const result = await queryTodos()
    expect(result).toEqual(mockTodos)
  })
})

describe('insertTodos', () => {
  test('should insert a new todo', async () => {
    const newTodo = { id: '123', text: 'New Todo', isDone: false }
    await expect(insertTodos(newTodo)).resolves.not.toThrow()
  })
})

describe('updateTodos', () => {
  test('should update a todo', async () => {
    const updatedTodo = { id: '123', text: 'Updated Todo', isDone: true }
    await expect(updateTodos('123', updatedTodo)).resolves.not.toThrow()
  })
})

describe('deleteTodos', () => {
  test('should delete a todo', async () => {
    await expect(deleteTodos('123')).resolves.not.toThrow()
  })
})
