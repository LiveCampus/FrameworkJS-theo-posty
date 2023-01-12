import { ProductDto } from '@models/Product/product.dto'
import { ProductRepository } from '@repositories/product.repository'
import { inject, injectable } from 'inversify'

@injectable()
export class ProductService {
  constructor(@inject(ProductRepository) private _productRepository: ProductRepository) {}

  public async getProducts() {
    const products = await this._productRepository.getProducts()

    return ProductDto.fromMany(products)
  }
}
