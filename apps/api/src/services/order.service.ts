import { OrderDto } from '@models/Order/order.dto'
import { OrderRepository } from '@repositories/order.repository'
import { inject, injectable } from 'inversify'

@injectable()
export class OrderService {
  constructor(@inject(OrderRepository) private _orderRepository: OrderRepository) {}

  public async getOrders() {
    const orders = await this._orderRepository.getOrders()

    return OrderDto.fromMany(orders)
  }
}
