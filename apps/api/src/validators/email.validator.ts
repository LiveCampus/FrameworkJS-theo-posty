import { HttpException } from '@theo-coder/api-lib'

export function validateEmail(email: string) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    throw new HttpException('You must enter a valid email adress', 401)
  }
}
