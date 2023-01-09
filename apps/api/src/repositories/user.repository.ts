import { IUser } from '@models/User/user.model'
import { DBService } from '@services/database.service'
import { HttpException } from '@theo-coder/api-lib'
import { injectable } from 'inversify'

@injectable()
export class UserRepository {
  constructor(private readonly _dbContext: DBService) {}

  public async getUsers() {
    return this._dbContext.user.find({})
  }

  public async getUserById(id: string) {
    return this._dbContext.user
      .findById(id)
      .then((entity) => entity)
      .catch(() => null)
  }

  public async getUserByEmail(email: string) {
    return this._dbContext.user
      .findOne({ email })
      .then((entity) => entity)
      .catch(() => null)
  }

  public async addUser(payload: Partial<IUser>) {
    return this._dbContext.user.create(payload)
  }

  public async updateUser(id: string, payload: Partial<IUser>) {
    const foundUser = await this.getUserById(id)

    if (!foundUser) {
      throw new HttpException('User does not exist', 404)
    }

    if (payload.email) {
      foundUser.email = payload.email
    }

    if (payload.password) {
      foundUser.password = payload.password
    }

    if (payload.role) {
      foundUser.role = payload.role
    }

    return foundUser.save()
  }

  public async deleteUser(id: string) {
    return this._dbContext.user.deleteOne({ _id: id })
  }
}
