export type ServerResponse = {
  data: any
  error: string | null
  statusCode: number
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export type AuthUser = {
  email: string
  role: Role
  token: string
}
