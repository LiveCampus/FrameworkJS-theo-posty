import { HttpException } from '@theo-coder/api-lib'

export function validatePassword(password: string) {
  if (password.length < 8) {
    throw new HttpException('Password must be at least 8 characters long', 401)
  }

  if (password.length > 32) {
    throw new HttpException('Password length must not exceed 32 characters', 401)
  }

  if (password.toUpperCase() === password) {
    throw new HttpException('Password must contain at least one lowercase letter', 401)
  }

  if (password.toLowerCase() === password) {
    throw new HttpException('Password must contain at least one uppercase letter', 401)
  }

  if (!/\d/.test(password)) {
    throw new HttpException('Password must contain at least one number', 401)
  }

  if (!/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password)) {
    throw new HttpException('Password must contain at least one special character', 401)
  }
}
