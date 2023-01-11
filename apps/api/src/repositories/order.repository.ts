import { DBService } from '@services/database.service'
import { injectable } from 'inversify'

@injectable()
export class OrderRepository {
  constructor(private readonly _dbContext: DBService) {}

  public async getOrders() {
    return this._dbContext.order.find({})
  }

  public async getOrderById(id: string) {
    return this._dbContext.order
      .findById(id)
      .then((entity) => entity)
      .catch(() => null)
  }
}
