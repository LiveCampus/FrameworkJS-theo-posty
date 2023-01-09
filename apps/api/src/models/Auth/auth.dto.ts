import { HttpException } from '@theo-coder/api-lib'

export class AuthenticationDto {
  constructor(public readonly email: string, public readonly password: string) {}

  static from(body: Partial<AuthenticationDto>) {
    if (!body.email) {
      throw new HttpException('Missing property email', 419)
    }

    if (!body.password) {
      throw new HttpException('Missing property password', 419)
    }

    // validate email
    // validate password

    return new AuthenticationDto(body.email, body.password)
  }
}
