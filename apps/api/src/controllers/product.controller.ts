import { ValidateRequest } from '@middlewares/request-validator.middleware'
import { FilterProductDto } from '@models/Product/product.dto'
import { ProductService } from '@services/product.service'
import { HttpResponse } from '@theo-coder/api-lib'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpGet, request, response } from 'inversify-express-utils'

@controller('/products')
export class ProductController extends BaseHttpController {
  @inject(ProductService) private _productService: ProductService

  @httpGet('/')
  public async getProducts(@response() res: Response) {
    const products = await this._productService.getProducts()

    const response = HttpResponse.success(products, 200)
    res.status(response.statusCode).json(response)
  }

  @httpGet('/:id', ValidateRequest.withParams(FilterProductDto))
  public async getProduct(@request() req: Request, @response() res: Response) {
    const product = await this._productService.getProduct(req.body)

    const response = HttpResponse.success(product, 200)
    res.status(response.statusCode).json(response)
  }
}
