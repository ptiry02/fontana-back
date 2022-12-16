import { Router } from 'express'
import { Food_es, Food_cat } from '../models/Food.model.js'
import isAuthenticated from '../midleware/jwt.middleware.js'

const foodsRouter = Router()

foodsRouter.get('/', async (req, res) => {
  try {
    const recipes_es = await Food_es.find()
    const recipes_cat = await Food_cat.find()
    const categories_es = Food_es.schema.path('category').enumValues
    const categories_cat = Food_cat.schema.path('category').enumValues

    res.status(200).json({
      es: { recipes: recipes_es, categories: categories_es },
      cat: { recipes: recipes_cat, categories: categories_cat },
    })
  } catch (err) {
    console.log('Error fetching the recipes: ', err)
    res.status(404).json({ status: 'failed', code: 404, message: err.message })
  }
})

foodsRouter.post('/', isAuthenticated, async (req, res) => {
  const { es, cat } = req.body

  try {
    const newEsRecipe = await Food_es.create(es)
    const newCatRecipe = await Food_cat.create(cat)

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Nueva receta creada!',
      receta: { es: newEsRecipe, cat: newCatRecipe },
    })
  } catch (err) {
    console.log('Error creating new recipe: ', err)
    if (err.name === 'ValidationError' && err.errors.price) {
      res.status(400).json({ status: 'failed', code: 400, message: err.errors.price.message })
    }

    res.json({ ups: 'An error ocurred!', error: err })
  }
})

foodsRouter.get('/join', async (req, res) => {
  const food_es = await Food_es.find()
  const food_cat = await Food_cat.find()

  const join = []

  for (let i = 0; i < food_es.length; i++) {
    join.push({
      name: [food_es[i].name, food_cat[i].name],
      description: [food_es[i].description, food_cat[i].description],
      price: food_es[i].price,
      category: [food_es[i].category, food_cat[i].category],
    })
  }

  res.json(join)
})
export default foodsRouter
