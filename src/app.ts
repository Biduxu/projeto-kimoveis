import express, { Application } from 'express'
import 'express-async-errors'
import { handleErrors } from './errors'
import categoriesRoutes from './routes/categories.routes'
import loginRoutes from './routes/login.routes'
import realEstateRoutes from './routes/realEstate.routes'
import schedulesRoutes from './routes/schedules.routes'
import usersRoutes from './routes/users.routes'

const app: Application = express()
app.use(express.json())

app.use('/users', usersRoutes)
app.use('/login', loginRoutes)
app.use('/categories', categoriesRoutes)
app.use('/realEstate', realEstateRoutes)
app.use('/schedules', schedulesRoutes)

app.use(handleErrors)

export default app