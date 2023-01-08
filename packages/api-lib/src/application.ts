import { Container, interfaces } from 'inversify'

export interface IApplicationOptions {
  containerOpts: interfaces.ContainerOptions
}

export abstract class Application {
  protected readonly container: Container

  constructor(options: IApplicationOptions) {
    this.container = new Container(options.containerOpts)

    this.configureServices(this.container)
    this.setup(options)
  }

  abstract configureServices(container: Container): void
  abstract setup(options: IApplicationOptions): Promise<void> | void
}
