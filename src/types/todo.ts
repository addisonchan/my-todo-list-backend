import { z } from 'zod'

export const TodoSchema = z.object({
  id: z.string().nanoid(),
  text: z.string().min(1),
  isDone: z.boolean()
})

export type Todo = z.infer<typeof TodoSchema>
