import { IUser } from '@models/User/user.model'
import { DBService } from '@services/database.service'
import { injectable } from 'inversify'

@injectable()
export class UserRepository {
  constructor(private readonly _dbContext: DBService) {}

  public getUsers() {
    return this._dbContext.user.find({})
  }
}
