import { Container, interfaces } from 'inversify'

export enum MorganMode {
  DEV = 'dev',
  COMMON = 'common',
  TINY = 'tiny',
  SHORT = 'short',
  COMBINED = 'combined',
}

export interface IApplicationOptions {
  containerOpts: interfaces.ContainerOptions
  morgan: {
    mode: MorganMode
  }
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
