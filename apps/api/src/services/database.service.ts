import { IUser, userModel } from '@models/User/user.model'
import { injectable } from 'inversify'
import mongoose from 'mongoose'

@injectable()
export class DBService {
  private _db: typeof mongoose

  public async connect() {
    mongoose.set('strictQuery', true)
    this._db = await mongoose.connect(process.env.DB_URI)

    console.log('connected to DB')
  }

  get user() {
    return this._db.model<IUser>('User', userModel)
  }

  public static async user_static() {
    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(process.env.DB_URI)

    return db.model<IUser>('User', userModel)
  }
}
