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
