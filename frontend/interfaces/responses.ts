export interface ValidationError {
  field: string,
  message: string
}

export interface SuccessfulResponse<T> {
  success: boolean,
  items: T,
  loading?: boolean
}

export interface SuccessfulDataResponse<T> extends Pick<SuccessfulResponse<T>, 'success'> {
  data: T
}

export interface UnsuccessfulResponse {
  success: boolean,
  error: string,
  validation_error?: Array<ValidationError>
}

export interface ListResponse<T> {
  total: number,
  limit: number,
  page: number,
  items: Array<T>,
}
