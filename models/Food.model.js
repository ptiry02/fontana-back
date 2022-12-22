import { Schema, model } from 'mongoose'

export const Food = model(
  'Food',
  new Schema({
    name: {
      type: [String],
      required: [true, 'Dale un nombre a tu receta.'],
      trim: true,
      unique: true,
    },
    description: {
      type: [String],
    },
    price: {
      type: Number,
      required: [true, '¿Que pasa? ¿Que va a ser gratis el plato? Venga va...'],
      min: [0.01, '¿Que pasa? ¿Que va a ser gratis el plato? Venga va...'],
    },
    category: {
      type: [String],
      enum: [
        'nuestros entrantes',
        'els nostres entrants',
        'pasta',
        'pasta',
        'ahumados',
        'fumats',
        'ibéricos d.o. guijuelo',
        'ibèrics d.o. guijuelo',
        'medias raciones',
        'mitges racions',
        'nuestras carnes a la brasa',
        'les nostres carns a la brasa',
        'complementos',
        'complements',
        'nuestras pizzas',
        'les nostres pizzes',
        'nuestras torradas',
        'les nostres torrades',
        'nuestros asados',
        'els nostres rostits',
      ],
      required: [true, 'Escoje el tipo de plato.'],
    },
  }),
  'food'
)
