import { Application, HttpException, HttpResponse, IApplicationOptions } from '@theo-coder/api-lib'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import express, { NextFunction, Request, Response } from 'express'
import { UserRepository } from '@repositories/user.repository'
import { UserService } from '@services/user.service'
import { DBService } from '@services/database.service'
import { AuthService } from '@services/auth.service'

export class App extends Application {
  constructor() {
    super({
      containerOpts: {
        defaultScope: 'Singleton',
      },
    })
  }

  configureServices(container: Container) {
    container.bind(DBService).toSelf()

    container.bind(AuthService).toSelf()

    container.bind(UserRepository).toSelf()
    container.bind(UserService).toSelf()
  }

  async setup(options: IApplicationOptions) {
    const _db = this.container.get(DBService)

    await _db.connect()

    const server = new InversifyExpressServer(this.container, null, { rootPath: '/api/v1' })

    server.setConfig((app) => {
      app.use(express.json())
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
