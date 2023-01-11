import { HttpException } from '@theo-coder/api-lib'
import { validateEmail } from '@validators/email.validator'
import { validatePassword } from '@validators/password.validator'
import { validateRole } from '@validators/role.validator'
import { IUser, Role } from './user.model'

export class UserDto {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly role: Role,
  ) {}

  static from(entity: IUser) {
    return new UserDto(entity._id, entity.email, entity.role)
  }

  static fromMany(entities: IUser[]) {
    return entities.map((entity) => UserDto.from(entity))
  }
}

export class FilterUserDto {
  constructor(public readonly id: string) {}

  static from(payload: Partial<FilterUserDto>) {
    if (!payload.id) {
      throw new HttpException('Missing property id', 419)
    }

    return new FilterUserDto(payload.id)
  }
}

export class UpdateUserDto {
  constructor(
    public readonly id: string,
    public readonly email?: string,
    public readonly password?: string,
    public readonly role?: Role,
  ) {}

  static from(payload: Partial<UpdateUserDto>) {
    if (!payload.id) {
      throw new HttpException('Missing property id', 419)
    }

    if (payload.email) {
      validateEmail(payload.email)
    }

    if (payload.password) {
      validatePassword(payload.password)
    }

    if (payload.role) {
      validateRole(payload.role)
    }

    return new UpdateUserDto(payload.id, payload.email, payload.password, payload.role)
  }
}
