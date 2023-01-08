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
})

export type User = typeof userModel
