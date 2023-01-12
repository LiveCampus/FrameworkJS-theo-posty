import { FilterProductDto, ProductDto } from '@models/Product/product.dto'
import { ProductRepository } from '@repositories/product.repository'
import { HttpException } from '@theo-coder/api-lib'
import { inject, injectable } from 'inversify'

@injectable()
export class ProductService {
  constructor(@inject(ProductRepository) private _productRepository: ProductRepository) {}

  public async getProducts() {
    const products = await this._productRepository.getProducts()

    return ProductDto.fromMany(products)
  }

  public async getProduct(payload: FilterProductDto) {
    const foundProduct = await this._productRepository.getProductById(payload.id)

    if (!foundProduct) {
      throw new HttpException('No product found with the given id', 404)
    }

    return ProductDto.from(foundProduct)
  }
}
