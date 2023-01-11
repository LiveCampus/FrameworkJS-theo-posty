import { AuthMiddleware } from '@middlewares/auth.middleware'
import { ValidateRequest } from '@middlewares/request-validator.middleware'
import { FilterOrderDto, UpdateOrderDto } from '@models/Order/order.dto'
import { Role } from '@models/User/user.model'
import { OrderService } from '@services/order.service'
import { AuthRequest, HttpException, HttpResponse } from '@theo-coder/api-lib'
import { Response } from 'express'
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

@controller('/orders')
export class OrderController extends BaseHttpController {
  @inject(OrderService) private _orderService: OrderService

  @httpGet('/', AuthMiddleware)
  public async getOrders(@request() req: AuthRequest, @response() res: Response) {
    if (req.body.authUser.role !== Role.ADMIN) {
      throw new HttpException('You are not allowed to see this', 403)
    }

    const orders = await this._orderService.getOrders()

    const response = HttpResponse.success(orders, 200)
    res.status(response.statusCode).json(response)
  }

  @httpGet('/:id', ValidateRequest.withParams(FilterOrderDto), AuthMiddleware)
  public async getOrder(@request() req: AuthRequest<FilterOrderDto>, @response() res: Response) {
    const order = await this._orderService.getOrder(req.body)

    if (req.body.authUser.role !== Role.ADMIN && order.user._id !== req.body.authUser._id) {
      throw new HttpException('You are not allowed to see this', 403)
    }

    const response = HttpResponse.success(order, 200)
    res.status(response.statusCode).json(response)
  }

  @httpPost('/', AuthMiddleware)
  public async createOrder(@request() req: AuthRequest, @response() res: Response) {
    const order = await this._orderService.createOrder({ user: req.body.authUser })

    const response = HttpResponse.success(order, 201)
    res.status(response.statusCode).json(response)
  }

  @httpPut('/:id', ValidateRequest.withParams(UpdateOrderDto), AuthMiddleware)
  public async updateOrder(@request() req: AuthRequest<UpdateOrderDto>, @response() res: Response) {
    if (req.body.authUser.role !== Role.ADMIN) {
      throw new HttpException('You are not allowed to do this', 403)
    }

    await this._orderService.updateOrder(req.body)

    const response = HttpResponse.success({}, 204)
    res.status(response.statusCode).json(response)
  }

  @httpDelete('/:id', ValidateRequest.withParams(FilterOrderDto), AuthMiddleware)
  public async deleteOrder(@request() req: AuthRequest<FilterOrderDto>, @response() res: Response) {
    const order = await this._orderService.getOrder(req.body)

    if (req.body.authUser.role !== Role.ADMIN && order.user._id !== req.body.authUser._id) {
      throw new HttpException('You are not allowed to do this', 403)
    }

    await this._orderService.deleteOrder(req.body)

    const response = HttpResponse.success({}, 204)
    res.status(response.statusCode).json(response)
  }
}
