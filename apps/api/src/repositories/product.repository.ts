import { IProduct } from '@models/Product/product.model'
import { DBService } from '@services/database.service'
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
}
