import { inject } from 'inversify'
import {
  controller,
  httpDelete,
  httpGet,
  httpPut,
  requestBody,
  requestParam,
} from 'inversify-express-utils'
import { UserService } from '@services/user.service'
import { IUser } from '@models/User/user.model'

@controller('/users')
export class UserController {
  constructor(@inject(UserService) private _userService: UserService) {}

  @httpGet('/')
  public async getUsers() {
    return this._userService.getUsers()
  }

  @httpGet('/:id')
  public async getUser(@requestParam('id') id: string) {
    return this._userService.getUser(id)
  }

  @httpPut('/:id')
  public async updateUser(@requestParam('id') id: string, @requestBody() payload: Partial<IUser>) {
    return this._userService.updateUser(id, payload)
  }

  @httpDelete('/:id')
  public async deleteUser(@requestParam('id') id: string) {
    return this._userService.deleteUser(id)
  }
}
