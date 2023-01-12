import { HttpException } from '@theo-coder/api-lib'
import { IProduct } from './product.model'

export class ProductDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly description?: string,
    public readonly image?: string,
  ) {}

  static from(entity: IProduct) {
    return new ProductDto(entity._id, entity.name, entity.price, entity.description, entity.image)
  }

  static fromMany(entities: IProduct[]) {
    return entities.map((entity) => ProductDto.from(entity))
  }
}

export class FilterProductDto {
  constructor(public readonly id: string) {}

  static from(payload: Partial<FilterProductDto>) {
    if (!payload.id) {
      throw new HttpException('Missing property id', 419)
    }

    return new FilterProductDto(payload.id)
  }
}

export class CreateProductDto {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly description?: string,
    public readonly image?: string,
  ) {}

  static from(payload: Partial<CreateProductDto>) {
    if (!payload.name) {
      throw new HttpException('Missing property name', 419)
    }

    if (!payload.price) {
      throw new HttpException('Missing property price', 419)
    }

    return new CreateProductDto(payload.name, payload.price, payload.description, payload.image)
  }
}

export class UpdateProductDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly price?: number,
    public readonly description?: string,
    public readonly image?: string,
  ) {}

  static from(payload: Partial<UpdateProductDto>) {
    if (!payload.id) {
      throw new HttpException('Missing property id', 419)
    }

    return new UpdateProductDto(
      payload.id,
      payload.name,
      payload.price,
      payload.description,
      payload.image,
    )
  }
}
