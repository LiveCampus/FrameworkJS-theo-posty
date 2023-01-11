import { IOrder } from '@models/Order/order.model'
import { DBService } from '@services/database.service'
import { HttpException } from '@theo-coder/api-lib'
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

  public async updateOrder(id: string, payload: Partial<IOrder>) {
    const foundOrder = await this.getOrderById(id)

    if (!foundOrder) {
      throw new HttpException('Order does not exist', 404)
    }

    if (payload.status) {
      foundOrder.status = payload.status
    }

    return foundOrder.save()
  }
}
