import express from 'express'
import { createCourse } from './routes'
import { categoriesRoutes } from './routes/categories.routes'
import { specificationsRoutes } from './routes/specifications.routes'

const app = express()

app.use(express.json())
app.use('/categories', categoriesRoutes)
app.use('/specifications', specificationsRoutes)

app.get('/', createCourse)

app.listen(3333, () => {
  console.log('🚀 Server launched successfully on port 3333')
})