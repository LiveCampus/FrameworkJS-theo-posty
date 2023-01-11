import { IUser } from '@models/User/user.model'
import { AuthDto, HttpException } from '@theo-coder/api-lib'
import { IOrder, OrderStatus } from './order.model'

export class OrderDto {
  constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly status: OrderStatus,
    public readonly user: IUser,
  ) {}

  static from(entity: IOrder) {
    return new OrderDto(entity._id, entity.date, entity.status, entity.user)
  }

  static fromMany(entities: IOrder[]) {
    return entities.map((entity) => OrderDto.from(entity))
  }
}

export class FilterOrderDto {
  constructor(public readonly id: string) {}

  static from(payload: Partial<FilterOrderDto>) {
    if (!payload.id) {
      throw new HttpException('Missing property id', 419)
    }

    return new FilterOrderDto(payload.id)
  }
}

export class CreateOrderDto {
  constructor(public readonly user: AuthDto) {}

  static from(payload: Partial<CreateOrderDto>) {
    if (!payload.user) {
      throw new HttpException('Missing property user', 419)
    }

    return new CreateOrderDto(payload.user)
  }
}
