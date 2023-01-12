import mongoose from 'mongoose'

export interface IProduct {
  _id: string
  name: string
  price: number
  description?: string
  image?: string
}

export const productModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
})

mongoose.model('Product', productModel)

export type Product = typeof productModel
