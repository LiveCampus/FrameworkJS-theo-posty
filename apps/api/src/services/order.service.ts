import {
  CreateOrderDto,
  FilterOrderDto,
  OrderDto,
  UpdateOrderDto,
  UpdateProductsInOrderDto,
} from '@models/Order/order.dto'
import { ProductDto } from '@models/Product/product.dto'
import { OrderRepository } from '@repositories/order.repository'
import { ProductRepository } from '@repositories/product.repository'
import { HttpException } from '@theo-coder/api-lib'
import { inject, injectable } from 'inversify'

@injectable()
export class OrderService {
  constructor(
    @inject(OrderRepository) private _orderRepository: OrderRepository,
    @inject(ProductRepository) private _productRepository: ProductRepository,
  ) {}

  public async getOrders() {
    const orders = await this._orderRepository.getOrders()

    return OrderDto.fromMany(orders)
  }

  public async getOrder(payload: FilterOrderDto) {
    const foundOrder = await this._orderRepository.getFullOrderById(payload.id)

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

  public async addProduct(payload: UpdateProductsInOrderDto, order: OrderDto) {
    const product = await this._productRepository.getProductById(payload.productId)

    if (!product) {
      throw new HttpException('No product found with this id', 404)
    }

    const products = [...order.products]

    for (let i = 0; i < payload.quantity; i++) {
      products.push(product)
    }

    await this._orderRepository.updateOrder(payload.orderId, { products })
  }

  public async removeProduct(payload: UpdateProductsInOrderDto, order: OrderDto) {
    for (let i = 0; i < payload.quantity; i++) {
      const index = order.products.findIndex((item) => item._id.valueOf() === payload.productId)

      order.products.splice(index, 1)
    }

    await this._orderRepository.updateOrder(payload.orderId, { products: order.products })
  }
}
