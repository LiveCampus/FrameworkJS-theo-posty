import { ProductService } from '@services/product.service'
import { HttpResponse } from '@theo-coder/api-lib'
import { Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpGet, response } from 'inversify-express-utils'

@controller('/products')
export class ProductController extends BaseHttpController {
  @inject(ProductService) private _productService: ProductService

  @httpGet('/')
  public async getProducts(@response() res: Response) {
    const products = await this._productService.getProducts()

    const response = HttpResponse.success(products, 200)
    res.status(response.statusCode).json(response)
  }
}
