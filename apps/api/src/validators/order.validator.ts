import { OrderStatus } from '@models/Order/order.model'
import { HttpException } from '@theo-coder/api-lib'

export function validateOrderStatus(status: OrderStatus) {
  if (!Object.values(OrderStatus).includes(status)) {
    throw new HttpException("This status doesn't exist", 404)
  }
}
