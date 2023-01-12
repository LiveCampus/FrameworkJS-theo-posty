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
}
