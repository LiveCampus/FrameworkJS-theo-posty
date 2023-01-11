import {
  Application,
  HttpException,
  HttpResponse,
  IApplicationOptions,
  MorganMode,
} from '@theo-coder/api-lib'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import express, { NextFunction, Request, Response } from 'express'
import { UserRepository } from '@repositories/user.repository'
import { UserService } from '@services/user.service'
import { DBService } from '@services/database.service'
import { AuthService } from '@services/auth.service'
import morgan from 'morgan'
import { OrderRepository } from '@repositories/order.repository'
import { OrderService } from '@services/order.service'

export class App extends Application {
  constructor() {
    super({
      containerOpts: {
        defaultScope: 'Singleton',
      },
      morgan: {
        mode: MorganMode.DEV,
      },
    })
  }

  configureServices(container: Container) {
    container.bind(DBService).toSelf()

    container.bind(AuthService).toSelf()

    container.bind(UserRepository).toSelf()
    container.bind(UserService).toSelf()

    container.bind(OrderRepository).toSelf()
    container.bind(OrderService).toSelf()
  }

  async setup(options: IApplicationOptions) {
    const _db = this.container.get(DBService)

    await _db.connect()

    const server = new InversifyExpressServer(this.container, null, { rootPath: '/api/v1' })

    server.setConfig((app) => {
      app.use(express.json())
      app.use(morgan(options.morgan.mode))
    })

    server.setErrorConfig((app) => {
      app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
        if (err instanceof HttpException) {
          const response = HttpResponse.failed(err.message, err.statusCode)
          return res.status(response.statusCode).json(response)
        }

        if (err instanceof Error) {
          const response = HttpResponse.failed(err.message, 500)
          return res.status(response.statusCode).json(response)
        }

        next()
      })
    })

    const app = server.build()

    app.listen(process.env.PORT, () => {
      console.log(`running on port http://localhost:${process.env.PORT}/`)
    })
  }
}
