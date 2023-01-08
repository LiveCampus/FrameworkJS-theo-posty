export class HttpResponse {
  constructor(
    public readonly data: any = {},
    public readonly error: string | null = null,
    public readonly statusCode: number,
  ) {}

  static success(data: any, statusCode = 200) {
    return new HttpResponse(data, null, statusCode)
  }

  static failed(msg: string, statusCode = 400) {
    return new HttpResponse(null, msg, statusCode)
  }
}
