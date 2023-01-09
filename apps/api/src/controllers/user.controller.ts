import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPut,
  requestBody,
  requestParam,
} from 'inversify-express-utils'
import { UserService } from '@services/user.service'
import { IUser, Role } from '@models/User/user.model'
import { AuthMiddleware } from '@middlewares/auth.middleware'
import { AuthPayload, HttpException } from '@theo-coder/api-lib'

@controller('/users')
export class UserController extends BaseHttpController {
  @inject(UserService) private _userService: UserService

  @httpGet('/', AuthMiddleware)
  public async getUsers(@requestBody() payload: AuthPayload) {
    if (payload.authUser.role !== Role.ADMIN) {
      throw new HttpException('You are not allowed to see this', 403)
    }

    return this._userService.getUsers()
  }

  @httpGet('/:id', AuthMiddleware)
  public async getUser(@requestParam('id') id: string, @requestBody() payload: AuthPayload) {
    if (payload.authUser.role !== Role.ADMIN && id !== payload.authUser._id) {
      throw new HttpException('You are not allowed to see this', 403)
    }

    return this._userService.getUserById(id)
  }

  @httpPut('/:id', AuthMiddleware)
  public async updateUser(
    @requestParam('id') id: string,
    @requestBody() payload: AuthPayload<Partial<IUser>>,
  ) {
    if (payload.authUser.role !== Role.ADMIN && id !== payload.authUser._id) {
      throw new HttpException('You are not allowed to do this', 403)
    }

    return this._userService.updateUser(id, payload)
  }

  @httpDelete('/:id', AuthMiddleware)
  public async deleteUser(@requestParam('id') id: string, @requestBody() payload: AuthPayload) {
    if (payload.authUser.role !== Role.ADMIN && id !== payload.authUser._id) {
      throw new HttpException('You are not allowed to do this', 403)
    }

    return this._userService.deleteUser(id)
  }
}
