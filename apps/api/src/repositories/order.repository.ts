import { IOrder } from '@models/Order/order.model'
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

  public async addOrder(payload: Partial<IOrder>) {
    return this._dbContext.order.create({ user: payload })
  }
}
