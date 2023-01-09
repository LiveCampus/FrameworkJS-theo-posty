import { DBService } from '@services/database.service'
import { AuthDto, HttpException } from '@theo-coder/api-lib'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const bearer_token = req.headers.authorization

  if (!bearer_token) {
    throw new HttpException('Not token provided', 403)
  }
  const token = bearer_token.split(' ')[1]

  let decoded_token
  try {
    decoded_token = (await jwt.verify(token, process.env.SECRET_KEY)) as {
      _id: string
      email: string
    }
  } catch {
    throw new HttpException('Authentication token is malformed', 403)
  }

  const user = await (
    await DBService.user_static()
  )
    .findById(decoded_token._id)
    .then((user) => user)
    .catch(() => null)

  if (!user) {
    throw new HttpException('Authentication token is malformed', 403)
  }

  req.body.authUser = AuthDto.from(user)

  next()
}
