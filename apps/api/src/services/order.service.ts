import { FilterOrderDto, OrderDto } from '@models/Order/order.dto'
import { OrderRepository } from '@repositories/order.repository'
import { HttpException } from '@theo-coder/api-lib'
import { inject, injectable } from 'inversify'

@injectable()
export class OrderService {
  constructor(@inject(OrderRepository) private _orderRepository: OrderRepository) {}

  public async getOrders() {
    const orders = await this._orderRepository.getOrders()

    return OrderDto.fromMany(orders)
  }

  public async getOrder(payload: FilterOrderDto) {
    const foundOrder = await this._orderRepository.getOrderById(payload.id)

    if (!foundOrder) {
      throw new HttpException('No order found with the given id', 404)
    }

    return OrderDto.from(foundOrder)
  }
}
