import {
  CreateProductDto,
  FilterProductDto,
  ProductDto,
  UpdateProductDto,
} from '@models/Product/product.dto'
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

  public async createProduct(payload: CreateProductDto) {
    const existingProduct = await this._productRepository.getProductByName(payload.name)

    if (existingProduct) {
      throw new HttpException('A product with the same name already exists', 409)
    }

    const product = await this._productRepository.addProduct(payload)

    return ProductDto.from(product)
  }

  public async updateProduct(payload: UpdateProductDto) {
    await this._productRepository.updateProduct(payload.id, payload)
  }

  public async deleteProduct(payload: FilterProductDto) {
    if ((await this._productRepository.deleteProduct(payload.id)).deletedCount === 0) {
      throw new HttpException('Unable to delete this product', 404)
    }
  }
}
