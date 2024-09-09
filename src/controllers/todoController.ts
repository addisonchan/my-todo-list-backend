import { Request, Response, NextFunction } from 'express'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../models/todoModel'
import { Todo } from '../types/todo'
import { PostgresError } from 'postgres'

export const getAllTodos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allTodos = await getTodos()
    res.json(allTodos)
  } catch (error) {
    next(error)
  }
}

export const createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const newTodo: Todo = req.body
  try {
    await addTodo(newTodo)
    res.status(201).json(newTodo)
  } catch (error) {
    if (error instanceof PostgresError && error.code === '23505') {
      res.status(400).send(`Todo id ${newTodo.id} is already in use!`)
      return
    }
    next(error)
  }
}

export const updateTodoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = req.params.id
  const updatedTodo: Todo = req.body
  try {
    await updateTodo(id, updatedTodo)
    res.json(updatedTodo)
  } catch (error) {
    next(error)
  }
}

export const deleteTodoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = req.params.id
  try {
    await deleteTodo(id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
