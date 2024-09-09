import express from 'express'
import bodyParser from 'body-parser'
import todoRoutes from './routes/todoRoutes'
import { logger } from './middleware/logger'
import { errorHandler } from './middleware/errorHandler'
import { requestValidator } from './middleware/requestValidator'
import cors from 'cors'

const PORT = 3000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(logger)
app.use('/api', requestValidator)
app.use('/api', todoRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
