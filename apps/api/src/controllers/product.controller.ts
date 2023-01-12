import { AuthMiddleware } from '@middlewares/auth.middleware'
import { ValidateRequest } from '@middlewares/request-validator.middleware'
import { CreateProductDto, FilterProductDto, UpdateProductDto } from '@models/Product/product.dto'
import { Role } from '@models/User/user.model'
import { ProductService } from '@services/product.service'
import { AuthRequest, HttpException, HttpResponse } from '@theo-coder/api-lib'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
  response,
} from 'inversify-express-utils'

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

  @httpPost('/', ValidateRequest.with(CreateProductDto), AuthMiddleware)
  public async createProduct(
    @request() req: AuthRequest<CreateProductDto>,
    @response() res: Response,
  ) {
    if (req.body.authUser.role !== Role.ADMIN) {
      throw new HttpException('You are not allowed to do this', 403)
    }

    const product = await this._productService.createProduct(req.body)

    const response = HttpResponse.success(product, 201)
    res.status(response.statusCode).json(response)
  }

  @httpPut('/:id', ValidateRequest.withParams(UpdateProductDto), AuthMiddleware)
  public async updateProduct(
    @request() req: AuthRequest<UpdateProductDto>,
    @response() res: Response,
  ) {
    if (req.body.authUser.role !== Role.ADMIN) {
      throw new HttpException('You are not allowed to do this', 403)
    }

    await this._productService.updateProduct(req.body)

    const response = HttpResponse.success({}, 204)
    res.status(response.statusCode).json(response)
  }

  @httpDelete('/:id', ValidateRequest.withParams(FilterProductDto), AuthMiddleware)
  public async deleteProduct(
    @request() req: AuthRequest<FilterProductDto>,
    @response() res: Response,
  ) {
    if (req.body.authUser.role !== Role.ADMIN) {
      throw new HttpException('You are not allowed to do this', 403)
    }

    await this._productService.deleteProduct(req.body)

    const response = HttpResponse.success({}, 204)
    res.status(response.statusCode).json(response)
  }
}
