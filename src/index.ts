export type ErrorStatus =
  | 'bad_request'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'conflict'
  | 'gone'

export const errorStatusMap: Record<ErrorStatus, number> = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  gone: 410,
}

export interface TamedErrorPayload {
  friendly?: string
  userId?: string
  status?: ErrorStatus
}

export class TamedError extends Error {
  friendly?: string
  userId?: string
  statusId?: ErrorStatus

  constructor(
    message: string,
    { friendly, userId, status }: TamedErrorPayload = {}
  ) {
    super(message)
    // The Error class can't be simply extended
    // See: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, TamedError.prototype)

    this.friendly = friendly
    this.userId = userId
    this.statusId = status
  }

  get status() {
    return this.statusId ? errorStatusMap[this.statusId] : 500
  }
}
