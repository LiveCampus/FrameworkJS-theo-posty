import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPut,
  request,
  requestBody,
  requestParam,
  response,
} from 'inversify-express-utils'
import { UserService } from '@services/user.service'
import { IUser, Role } from '@models/User/user.model'
import { AuthMiddleware } from '@middlewares/auth.middleware'
import { AuthPayload, AuthRequest, HttpException, HttpResponse } from '@theo-coder/api-lib'
import { Response } from 'express'
import { ValidateRequest } from '@middlewares/request-validator.middleware'
import { FilterUserDto, UpdateUserDto } from '@models/User/user.dto'

@controller('/users')
export class UserController extends BaseHttpController {
  @inject(UserService) private _userService: UserService

  @httpGet('/', AuthMiddleware)
  public async getUsers(@request() req: AuthRequest, @response() res: Response) {
    if (req.body.authUser.role !== Role.ADMIN) {
      throw new HttpException('You are not allowed to see this', 403)
    }

    const users = await this._userService.getUsers()

    const response = HttpResponse.success(users, 200)
    res.status(response.statusCode).json(response)
  }

  @httpGet('/:id', ValidateRequest.withParams(FilterUserDto), AuthMiddleware)
  public async getUser(@request() req: AuthRequest<FilterUserDto>, @response() res: Response) {
    if (req.body.authUser.role !== Role.ADMIN && req.body.id !== req.body.authUser._id) {
      throw new HttpException('You are not allowed to see this', 403)
    }

    const user = await this._userService.getUser(req.body)

    const response = HttpResponse.success(user, 200)
    res.status(response.statusCode).json(response)
  }

  @httpPut('/:id', AuthMiddleware)
  public async updateUser(@request() req: AuthRequest<UpdateUserDto>, @response() res: Response) {
    if (req.body.authUser.role !== Role.ADMIN && req.body.id !== req.body.authUser._id) {
      throw new HttpException('You are not allowed to do this', 403)
    }

    await this._userService.updateUser(req.body)

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
