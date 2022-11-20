import { Router } from 'express'
import Food from '../models/Food.model.js'

const foodsRouter = Router()

foodsRouter.get('/:lang', async (req, res) => {
  const { lang } = req.params

  try {
    const recipes = await Food.find({ lang })

    res.json(recipes)
  } catch (err) {
    console.log('Error fetching the recipes: ', err)

    res.json({ ups: 'There has been an error!', error: err })
  }
})

foodsRouter.post('/:lang', async (req, res) => {
  const { lang } = req.params
  const recipe = req.body

  try {
    const newRecipe = await Food.create({ ...recipe, lang })

    res.json(newRecipe)
  } catch (err) {
    console.log('Error creating new recipe: ', err)

    res.json({ ups: 'An error ocurred!', error: err })
  }
})
export default foodsRouter
