import { Router } from 'express'
import { Food_es, Food_cat } from '../models/Food.model.js'
import isAuthenticated from '../midleware/jwt.middleware.js'

const foodsRouter = Router()

foodsRouter.get('/es/food', async (req, res) => {
  try {
    const recipes = await Food_es.find()

    res.json(recipes)
  } catch (err) {
    console.log('Error fetching the recipes: ', err)

    res.json({ ups: 'There has been an error!', error: err })
  }
})

foodsRouter.post('/es/food', isAuthenticated, async (req, res) => {
  const recipe = req.body

  try {
    const newRecipe = await Food_es.create(recipe)

    res.json(newRecipe)
  } catch (err) {
    console.log('Error creating new recipe: ', err)

    res.json({ ups: 'An error ocurred!', error: err })
  }
})

foodsRouter.get('/cat/food', async (req, res) => {
  try {
    const recipes = await Food_cat.find()

    res.json(recipes)
  } catch (err) {
    console.log('Error fetching the recipes: ', err)

    res.json({ ups: 'There has been an error!', error: err })
  }
})

foodsRouter.post('/cat/food', isAuthenticated, async (req, res) => {
  const recipe = req.body

  try {
    const newRecipe = await Food_cat.create(recipe)

    res.json(newRecipe)
  } catch (err) {
    console.log('Error creating new recipe: ', err)

    res.json({ ups: 'An error ocurred!', error: err })
  }
})
export default foodsRouter
