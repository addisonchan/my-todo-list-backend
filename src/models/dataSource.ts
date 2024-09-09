import postgres from 'postgres'
import dotenv from 'dotenv'
import { Todo } from '../types/todo'

dotenv.config()
const host = process.env.PGDB_HOST
const port = process.env.PGDB_PORT
const database = process.env.PGDB_DBNAME
const username = process.env.PGDB_USERNAME
const password = process.env.PGDB_PASSWORD

const sql = postgres(`postgres://${username}:${password}@${host}:${port}/${database}`)

export const queryTodos = async (): Promise<any[]> => {
  try {
    const queryRes = await sql<Todo[]>`SELECT * FROM todos`
    return queryRes
  } catch (error) {
    throw error as postgres.PostgresError
  }
}

export const insertTodos = async (todo: Todo): Promise<void> => {
  try {
    await sql`INSERT INTO todos ${sql(todo, 'id', 'text', 'isDone')}`
  } catch (error) {
    throw error
  }
}

export const updateTodos = async (id: string, updatedTodo: Todo): Promise<void> => {
  try {
    await sql`UPDATE todos SET "text" = ${updatedTodo.text}, "isDone" = ${updatedTodo.isDone} WHERE "id" = ${id}`
  } catch (error) {
    throw error
  }
}

export const deleteTodos = async (id: string): Promise<void> => {
  try {
    await sql`DELETE FROM todos WHERE "id" = ${id}`
  } catch (error) {
    throw error
  }
}
