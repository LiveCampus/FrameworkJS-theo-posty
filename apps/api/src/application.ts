import { Application, IApplicationOptions } from '@theo-coder/api-lib'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import express from 'express'

export class App extends Application {
  constructor() {
    super({
      containerOpts: {
        defaultScope: 'Singleton',
      },
    })
  }

  configureServices(container: Container) {
    //container.bind().toSelf()
  }

  async setup(options: IApplicationOptions) {
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
