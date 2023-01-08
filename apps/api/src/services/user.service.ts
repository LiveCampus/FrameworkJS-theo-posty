import { UserRepository } from '@repositories/user.repository'
import { inject, injectable } from 'inversify'

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private _userRepository: UserRepository) {}

  public async getUsers() {
    return this._userRepository.getUsers()
  }
}
