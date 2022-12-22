import { Router } from 'express'
import { Food } from '../models/Food.model.js'
import isAuthenticated from '../midleware/jwt.middleware.js'

const foodsRouter = Router()

foodsRouter.get('/', async (req, res) => {
  try {
    const recipes = await Food.find()
    const allCategories = Food.schema.path('category').caster.enumValues

    const recipes_es = recipes.map(item => ({
      id: item._id,
      name: item.name[0],
      description: item.description[0] ? item.description[0] : null,
      price: item.price,
      category: item.category[0],
    }))
    const recipes_cat = recipes.map(item => ({
      id: item._id,
      name: item.name[1],
      description: item.description[1] ? item.description[1] : null,
      price: item.price,
      category: item.category[1],
    }))

    const categories_es = allCategories.filter((val, i) => {
      if (!(i % 2)) return val
    })
    const categories_cat = allCategories.filter((val, i) => {
      if (i % 2) return val
    })

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
  const recipe = req.body

  try {
    const newRecipe = await Food.create(recipe)

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Nueva receta creada!',
      receta: newRecipe,
    })
  } catch (err) {
    console.log('Error creating new recipe: ', err)
    if (err.name === 'ValidationError' && err.errors.price) {
      res.status(400).json({ status: 'failed', code: 400, message: err.errors.price.message })
    }

    res.json({ ups: 'An error ocurred!', error: err.message })
  }
})

foodsRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const recipe = await Food.findById(id)

    res.status(200).json(recipe)
  } catch (err) {
    console.log('Error fetching recipe: ', err)
    res.status(404).json({ status: 'failed', code: 404, message: err.message })
  }
})

foodsRouter.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const recipe = await Food.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Receta Actualizada!',
      newRecipe: recipe,
    })
  } catch (err) {
    console.log('There has been an error: ', err)
    res.status(404).json({ status: 'failed', code: 404, message: err.message })
  }
})

foodsRouter.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params

  try {
    await Food.findByIdAndDelete(id)

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Receta Eliminada!',
    })
  } catch (err) {
    console.log('Error deleting recipe: ', err)
    res.status(404).json({ status: 'failed', code: 404, message: err.message })
  }
})

export default foodsRouter
