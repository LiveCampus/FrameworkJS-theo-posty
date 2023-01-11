import { CreateOrderDto, FilterOrderDto, OrderDto, UpdateOrderDto } from '@models/Order/order.dto'
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

  public async createOrder(payload: CreateOrderDto) {
    const order = await this._orderRepository.addOrder(payload.user)

    return OrderDto.from(order)
  }

  public async updateOrder(payload: UpdateOrderDto) {
    await this._orderRepository.updateOrder(payload.id, payload)
  }

  public async deleteOrder(payload: FilterOrderDto) {
    if ((await this._orderRepository.deleteOrder(payload.id)).deletedCount === 0) {
      throw new HttpException('Unable to delete this order', 404)
    }
  }
}
