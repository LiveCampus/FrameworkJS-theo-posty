import { DBService } from '@services/database.service'
import { injectable } from 'inversify'

@injectable()
export class OrderRepository {
  constructor(private readonly _dbContext: DBService) {}

  public async getOrders() {
    return this._dbContext.order.find({})
  }
}
