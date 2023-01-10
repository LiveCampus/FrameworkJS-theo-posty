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
