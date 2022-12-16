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
    description: [String],
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

export const Food_es = model(
  'Food_es',
  new Schema({
    name: {
      type: String,
      required: [true, 'Dale un nombre a tu receta.'],
      trim: true,
      unique: true,
    },
    description: String,
    price: {
      type: Number,
      required: [true, '¿Que pasa? ¿Que va a ser gratis el plato? Venga va...'],
      min: [0.01, '¿Que pasa? ¿Que va a ser gratis el plato? Venga va...'],
    },
    category: {
      type: String,
      enum: [
        'nuestros entrantes',
        'pasta',
        'ahumados',
        'ibéricos d.o. guijuelo',
        'medias raciones',
        'nuestras carnes a la brasa',
        'complementos',
        'nuestras pizzas',
        'nuestras torradas',
        'nuestros asados',
      ],
      required: [true, 'Escoje el tipo de plato.'],
    },
  }),
  'food_es'
)

export const Food_cat = model(
  'Food_cat',
  new Schema({
    name: {
      type: String,
      required: [true, 'Dale un nombre a tu receta.'],
      trim: true,
      unique: true,
    },
    description: String,
    price: {
      type: Number,
      required: [true, '¿Que pasa? ¿Que va a ser gratis el plato? Venga va...'],
      min: [0.01, '¿Que pasa? ¿Que va a ser gratis el plato? Venga va...'],
    },
    category: {
      type: String,
      enum: [
        'els nostres entrants',
        'pasta',
        'fumats',
        'ibèrics d.o. guijuelo',
        'mitges racions',
        'les nostres carns a la brasa',
        'complements',
        'les nostres pizzes',
        'les nostres torrades',
        'els nostres rostits',
      ],
      required: [true, 'Escoje el tipo de plato.'],
    },
  }),
  'food_cat'
)
