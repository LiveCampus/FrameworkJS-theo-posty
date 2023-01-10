import { Request, Response, NextFunction } from 'express'

export abstract class Middleware {
  constructor() {
    this.execute = this.execute.bind(this)
  }

  public abstract execute(req: Request, res: Response, next: NextFunction): void
}

export class AuthDto {
  constructor(
    public readonly _id: string,
    public readonly email: string,
    public readonly role: string,
  ) {}

  public static from(payload: AuthDto) {
    return new AuthDto(payload._id.valueOf(), payload.email.valueOf(), payload.role.valueOf())
  }
}

export type AuthPayload<T = Record<string, unknown>> = {
  authUser: AuthDto
} & T

export type AuthRequest<T = Record<string, unknown>> = Request<any, any, AuthPayload<T>>
