import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPut,
  requestBody,
  requestParam,
  response,
} from 'inversify-express-utils'
import { UserService } from '@services/user.service'
import { IUser, Role } from '@models/User/user.model'
import { AuthMiddleware } from '@middlewares/auth.middleware'
import { AuthPayload, HttpException, HttpResponse } from '@theo-coder/api-lib'
import { Response } from 'express'

@controller('/users')
export class UserController extends BaseHttpController {
  @inject(UserService) private _userService: UserService

  @httpGet('/', AuthMiddleware)
  public async getUsers(@requestBody() payload: AuthPayload, @response() res: Response) {
    if (payload.authUser.role !== Role.ADMIN) {
      throw new HttpException('You are not allowed to see this', 403)
    }

    const users = await this._userService.getUsers()

    const response = HttpResponse.success(users, 200)
    res.status(response.statusCode).json(response)
  }

  @httpGet('/:id', AuthMiddleware)
  public async getUser(
    @requestParam('id') id: string,
    @requestBody() payload: AuthPayload,
    @response() res: Response,
  ) {
    if (payload.authUser.role !== Role.ADMIN && id !== payload.authUser._id) {
      throw new HttpException('You are not allowed to see this', 403)
    }

    const user = await this._userService.getUserById(id)

    const response = HttpResponse.success(user, 200)
    res.status(response.statusCode).json(response)
  }

  @httpPut('/:id', AuthMiddleware)
  public async updateUser(
    @requestParam('id') id: string,
    @requestBody() payload: AuthPayload<Partial<IUser>>,
    @response() res: Response,
  ) {
    if (payload.authUser.role !== Role.ADMIN && id !== payload.authUser._id) {
      throw new HttpException('You are not allowed to do this', 403)
    }

    await this._userService.updateUser(id, payload)

    const response = HttpResponse.success({}, 204)
    res.status(response.statusCode).json(response)
  }

  @httpDelete('/:id', AuthMiddleware)
  public async deleteUser(
    @requestParam('id') id: string,
    @requestBody() payload: AuthPayload,
    @response() res: Response,
  ) {
    if (payload.authUser.role !== Role.ADMIN && id !== payload.authUser._id) {
      throw new HttpException('You are not allowed to do this', 403)
    }

    await this._userService.deleteUser(id)

    const response = HttpResponse.success({}, 204)
    res.status(response.statusCode).json(response)
  }
}
