import { IUser, Role } from '@models/User/user.model'
import { HttpException } from '@theo-coder/api-lib'
import { validateEmail } from '@validators/email.validator'
import { validatePassword } from '@validators/password.validator'

export class AuthenticationDto {
  constructor(public readonly email: string, public readonly password: string) {}

  static from(body: Partial<AuthenticationDto>) {
    if (!body.email) {
      throw new HttpException('Missing property email', 419)
    }

    if (!body.password) {
      throw new HttpException('Missing property password', 419)
    }

    validateEmail(body.email)
    validatePassword(body.password)

    return new AuthenticationDto(body.email, body.password)
  }
}

export class AuthUserDto {
  constructor(
    public readonly email: string,
    public readonly role: Role,
    public readonly token: string,
  ) {}

  static from(body: IUser, token: string) {
    return new AuthUserDto(body.email, body.role, token)
  }
}
