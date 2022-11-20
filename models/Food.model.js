import { Schema, model } from 'mongoose'

const Food = model(
  'Food',
  new Schema({
    name: {
      type: String,
      required: [true, 'Dale un nombre a tu receta.'],
      trim: true,
      unique: [true, 'Esta receta ya existe.'],
    },
    description: String,
    price: {
      type: Number,
      required: [true, '¿Que pasa? ¿Que va a ser gratis el plato? Venga va...'],
    },
    category: {
      type: String,
      enum: [
        'Entrantes',
        'Pasta',
        'Ahumados',
        'Ibéricos',
        'Medias Raciones',
        'Carnes',
        'Complementos',
        'Pizzas',
        'Torradas',
        'Asados',
      ],
      required: [true, 'Escoje el tipo de plato.'],
    },
    lang: {
      type: String,
      enum: ['es', 'cat'],
      required: true,
    },
  })
)
export default Food
