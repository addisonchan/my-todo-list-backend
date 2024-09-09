import { Todo } from './types/todo'

export const mockTodos: Todo[] = [
  { id: '5z33gw9ubPY35QDw4eRrO', text: 'Learn TypeScript', isDone: false },
  { id: 'ym_ssIdTvO1-06k4WOYbf', text: 'Build a REST API', isDone: true }
]

// Mock the postgres module
jest.mock('postgres', () => {
  return jest.fn().mockImplementation(() => {
    return jest.fn().mockImplementation(() => {
      return mockTodos
    })
  })
})
