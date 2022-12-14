import { Router } from 'express'
import authRouter from './auth.routes.js'
import foodsRouter from './food.routes.js'

const allRoutes = Router()

allRoutes.get('/', (req, res) => {
  res.json({ endpoints: 'comming soon...' })
})

allRoutes.use('/food', foodsRouter)
allRoutes.use('/', authRouter)

export default allRoutes
