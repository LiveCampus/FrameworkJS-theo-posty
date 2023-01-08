import { Application, IApplicationOptions } from '@theo-coder/api-lib'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import express from 'express'
import { UserRepository } from '@repositories/user.repository'
import { UserService } from '@services/user.service'
import { DBService } from '@services/database.service'

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

    container.bind(UserRepository).toSelf()
    container.bind(UserService).toSelf()
  }

  async setup(options: IApplicationOptions) {
    const _db = this.container.get(DBService)

    await _db.connect()

    const server = new InversifyExpressServer(this.container)

    server.setConfig((app) => {
      app.use(express.json())
    })

    const app = server.build()

    app.listen(process.env.PORT, () => {
      console.log(`running on port http://localhost:${process.env.PORT}/`)
    })
  }
}
