import { IUser } from '@models/User/user.model'
import { UserRepository } from '@repositories/user.repository'
import { HttpException } from '@theo-coder/api-lib'
import { inject, injectable } from 'inversify'

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private _userRepository: UserRepository) {}

  public async getUsers() {
    return this._userRepository.getUsers()
  }

  public async getUser(id: string) {
    return this._userRepository.getUser(id)
  }

  public async updateUser(id: string, payload: Partial<IUser>) {
    return this._userRepository.updateUser(id, payload)
  }

  public async deleteUser(id: string) {
    if ((await this._userRepository.deleteUser(id)).deletedCount === 0) {
      throw new HttpException('Unable to delete this user', 404)
    }
  }
}
