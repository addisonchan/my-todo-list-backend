import { Todo } from '../types/todo'
import { insertTodos, queryTodos, deleteTodos, updateTodos } from './dataSource'

export const getTodos = async (): Promise<Todo[]> => {
  try {
    return await queryTodos()
  } catch (error) {
    throw error
  }
}

export const addTodo = async (todo: Todo): Promise<void> => {
  try {
    await insertTodos(todo)
  } catch (error) {
    throw error
  }
}

export const updateTodo = async (id: string, updatedTodo: Todo): Promise<void> => {
  try {
    await updateTodos(id, updatedTodo)
  } catch (error) {
    throw error
  }
}

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await deleteTodos(id)
  } catch (error) {
    throw error
  }
}
