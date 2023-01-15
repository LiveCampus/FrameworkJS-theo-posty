import { IProduct } from '@models/Product/product.model'
import { IUser } from '@models/User/user.model'
import mongoose from 'mongoose'

export enum OrderStatus {
  VALID = 'valid',
  PAID = 'paid',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}

export interface IOrder {
  _id: string
  date: Date
  status: OrderStatus
  user: IUser
  products: IProduct[]
}

export const orderModel = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: OrderStatus,
    required: true,
    default: OrderStatus.VALID,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
})

export type Order = typeof orderModel
