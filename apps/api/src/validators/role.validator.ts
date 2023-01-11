import { Role } from '@models/User/user.model'
import { HttpException } from '@theo-coder/api-lib'

export function validateRole(role: Role) {
  if (!Object.values(Role).includes(role)) {
    throw new HttpException("This role doesn't exist", 404)
  }
}
