import { FilterUserDto, UserDto } from '@models/User/user.dto'
import { IUser, Role } from '@models/User/user.model'
import { UserRepository } from '@repositories/user.repository'
import { HttpException } from '@theo-coder/api-lib'
import { inject, injectable } from 'inversify'
import bcrypt from 'bcrypt'

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private _userRepository: UserRepository) {}

  public async getUsers() {
    const users = await this._userRepository.getUsers()

    return UserDto.fromMany(users)
  }

  public async getUser(payload: FilterUserDto) {
    const foundUser = await this._userRepository.getUserById(payload.id)

    if (!foundUser) {
      throw new HttpException('No user found with the given id', 404)
    }

    return UserDto.from(foundUser)
  }

  public async updateUser(id: string, payload: Partial<IUser>) {
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10)
    }

    // move this to input dto
    if (payload.role) {
      if (!Object.values(Role).includes(payload.role)) {
        throw new HttpException("This role doesn't exist", 404)
      }
    }

    await this._userRepository.updateUser(id, payload)
  }

  public async deleteUser(id: string) {
    if ((await this._userRepository.deleteUser(id)).deletedCount === 0) {
      throw new HttpException('Unable to delete this user', 404)
    }
  }
}
