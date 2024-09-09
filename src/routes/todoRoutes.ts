import { Router } from 'express'
import { getAllTodos, createTodo, updateTodoById, deleteTodoById } from '../controllers/todoController'

const router = Router()

router.get('/todos', getAllTodos)
router.post('/todos', createTodo)
router.put('/todos/:id', updateTodoById)
router.delete('/todos/:id', deleteTodoById)

export default router
