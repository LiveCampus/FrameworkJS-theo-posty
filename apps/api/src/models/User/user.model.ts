import { IOrder } from '@models/Order/order.model'
import mongoose from 'mongoose'

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  _id: string
  email: string
  password: string
  role: Role
  orders: IOrder[]
}

export const userModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Role,
    required: true,
    default: Role.USER,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
})

export type User = typeof userModel
