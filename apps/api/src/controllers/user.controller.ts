import { inject } from 'inversify'
import { controller, httpGet } from 'inversify-express-utils'
import { UserService } from '@services/user.service'

@controller('/users')
export class UserController {
  constructor(@inject(UserService) private _userService: UserService) {}

  @httpGet('/')
  public async getUsers() {
    return this._userService.getUsers()
  }
}
