import { AuthMiddleware } from '@middlewares/auth.middleware'
import { Role } from '@models/User/user.model'
import { OrderService } from '@services/order.service'
import { AuthRequest, HttpException, HttpResponse } from '@theo-coder/api-lib'
import { Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpGet, request, response } from 'inversify-express-utils'

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
}
