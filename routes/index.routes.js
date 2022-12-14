import { Router } from 'express'
import authRouter from './auth.routes.js'
import foodsRouter from './food.routes.js'

const allRoutes = Router()

allRoutes.get('/', (req, res) => {
  res.json({ endpoints: 'food/es for recipes in Spanish and food/cat for recipes in catalan' })
})

allRoutes.use('/food', foodsRouter)
allRoutes.use('/', authRouter)

export default allRoutes
