import { ValidateRequest } from '@middlewares/request-validator.middleware'
import { AuthenticationDto } from '@models/Auth/auth.dto'
import bcrypt from 'bcrypt'
import { UserService } from '@services/user.service'
import { HttpException } from '@theo-coder/api-lib'
import { inject } from 'inversify'
import { controller, httpPost, requestBody, BaseHttpController } from 'inversify-express-utils'
import { IUser } from '@models/User/user.model'
import jwt from 'jsonwebtoken'

@controller('/auth')
export class AuthController extends BaseHttpController {
  @inject(UserService) private _userService: UserService

  @httpPost('/register', ValidateRequest.with(AuthenticationDto))
  public async register(@requestBody() payload: IUser) {
    const existingUser = await this._userService.getUserByEmail(payload.email)

    if (existingUser) {
      throw new HttpException('Username already exists', 409)
    }

    payload.password = await bcrypt.hash(payload.password, 10)

    return this._userService.addUser(payload)
  }

  @httpPost('/login', ValidateRequest.with(AuthenticationDto))
  public async login(@requestBody() payload: IUser) {
    const foundUser = await this._userService.getUserByEmail(payload.email)

    if (!foundUser) {
      throw new HttpException('No user found with the given email', 404)
    }

    const verifyPassword = await bcrypt.compare(payload.password, foundUser.password)

    if (!verifyPassword) {
      throw new HttpException('Wrong password', 403)
    }

    const token = await jwt.sign(
      { _id: foundUser._id, email: payload.email },
      process.env.SECRET_KEY,
      // security issue but this is for test purpose
      { expiresIn: '365d' },
    )

    return token
  }
}
