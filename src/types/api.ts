export type TResponse<T> = {
  error: string | null
  statusCode: number
  data: T
}
