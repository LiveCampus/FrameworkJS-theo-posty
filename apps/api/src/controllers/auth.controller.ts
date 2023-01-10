import { ValidateRequest } from '@middlewares/request-validator.middleware'
import { AuthenticationDto } from '@models/Auth/auth.dto'
import { HttpResponse } from '@theo-coder/api-lib'
import { inject } from 'inversify'
import {
  controller,
  httpPost,
  requestBody,
  BaseHttpController,
  response,
} from 'inversify-express-utils'
import { IUser } from '@models/User/user.model'
import { Response } from 'express'
import { AuthService } from '@services/auth.service'

@controller('/auth')
export class AuthController extends BaseHttpController {
  @inject(AuthService) private _authService: AuthService

  @httpPost('/register', ValidateRequest.with(AuthenticationDto))
  public async register(@requestBody() payload: IUser, @response() res: Response) {
    const user = await this._authService.register(payload)

    const response = HttpResponse.success(user, 201)
    res.status(response.statusCode).json(response)
  }

  @httpPost('/login', ValidateRequest.with(AuthenticationDto))
  public async login(@requestBody() payload: IUser, @response() res: Response) {
    const user = await this._authService.login(payload)

    const response = HttpResponse.success(user, 200)
    res.status(response.statusCode).json(response)
  }
}
