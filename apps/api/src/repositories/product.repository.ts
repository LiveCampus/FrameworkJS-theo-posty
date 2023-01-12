import { IProduct } from '@models/Product/product.model'
import { DBService } from '@services/database.service'
import { HttpException } from '@theo-coder/api-lib'
import { injectable } from 'inversify'

@injectable()
export class ProductRepository {
  constructor(private readonly _dbContext: DBService) {}

  public async getProducts() {
    return this._dbContext.product.find({})
  }

  public async getProductById(id: string) {
    return this._dbContext.product
      .findById(id)
      .then((entity) => entity)
      .catch(() => null)
  }

  public async getProductByName(name: string) {
    return this._dbContext.product
      .findOne({ name })
      .then((entity) => entity)
      .catch(() => null)
  }

  public async addProduct(payload: Partial<IProduct>) {
    return this._dbContext.product.create(payload)
  }

  public async updateProduct(id: string, payload: Partial<IProduct>) {
    const foundProduct = await this.getProductById(id)

    if (!foundProduct) {
      throw new HttpException('Product does not exist', 404)
    }

    if (payload.name) {
      foundProduct.name = payload.name
    }

    if (payload.price) {
      foundProduct.price = payload.price
    }

    if (payload.description) {
      foundProduct.description = payload.description
    }

    if (payload.image) {
      foundProduct.image = payload.image
    }

    return foundProduct.save()
  }

  public async deleteProduct(id: string) {
    return this._dbContext.product.deleteOne({ _id: id })
  }
}
