import { IUser } from '@models/User/user.model'
import { UserRepository } from '@repositories/user.repository'
import { HttpException } from '@theo-coder/api-lib'
import { inject, injectable } from 'inversify'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthUserDto } from '@models/Auth/auth.dto'

@injectable()
export class AuthService {
  constructor(@inject(UserRepository) private _userRepository: UserRepository) {}

  public async register(payload: IUser) {
    const existingUser = await this._userRepository.getUserByEmail(payload.email)

    if (existingUser) {
      throw new HttpException('Username already exists', 409)
    }

    payload.password = await bcrypt.hash(payload.password, 10)

    const user = await this._userRepository.addUser(payload)

    const token = await jwt.sign(
      { _id: user._id, email: payload.email },
      process.env.SECRET_KEY,
      // security issue but this is for test purpose
      { expiresIn: '365d' },
    )

    return AuthUserDto.from(user, token)
  }

  public async login(payload: IUser) {
    const foundUser = await this._userRepository.getUserByEmail(payload.email)

    if (!foundUser) {
      throw new HttpException('No user found with the given email', 404)
    }

    const verifyPassword = await bcrypt.compare(payload.password, foundUser.password)

    if (!verifyPassword) {
      throw new HttpException('Wrong password', 403)
    }

    const token = await jwt.sign(
      { _id: foundUser.id, email: payload.email },
      process.env.SECRET_KEY,
      // security issue but this is for test purpose
      { expiresIn: '365d' },
    )

    return AuthUserDto.from(foundUser, token)
  }
}
