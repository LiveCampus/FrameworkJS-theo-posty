import { FilterUserDto, UpdateUserDto, UserDto } from '@models/User/user.dto'
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

  public async updateUser(payload: UpdateUserDto) {
    if (payload.email) {
      const existingUser = await this._userRepository.getUserByEmail(payload.email)

      if (existingUser) {
        throw new HttpException('Username already exists', 409)
      }
    }

    let password

    if (payload.password) {
      password = await bcrypt.hash(payload.password, 10)
    }

    await this._userRepository.updateUser(payload.id, {
      ...payload,
      password,
    })
  }

  public async deleteUser(payload: FilterUserDto) {
    if ((await this._userRepository.deleteUser(payload.id)).deletedCount === 0) {
      throw new HttpException('Unable to delete this user', 404)
    }
  }
}
