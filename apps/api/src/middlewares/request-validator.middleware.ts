import { Middleware } from '@theo-coder/api-lib'
import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'

@injectable()
export class ValidateRequest extends Middleware {
  constructor(private readonly _DtoClass: { from: any }, private readonly _withParams = false) {
    super()
  }

  public execute(req: Request, res: Response, next: NextFunction) {
    if (this._withParams) {
      req.body = {
        ...req.body,
        ...req.params,
      }
    }

    req.body = this._DtoClass.from(req.body)

    next()
  }

  static with(dto: any) {
    return new ValidateRequest(dto).execute
  }

  static withParams(dto: any) {
    return new ValidateRequest(dto, true).execute
  }
}
