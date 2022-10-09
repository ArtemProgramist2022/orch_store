export interface ValidationError {
    field: string,
    message: string
}

export interface SuccessfulResponse<T> {
    success: boolean,
    data?: T,
    loading?: boolean
}

export interface UnsuccessfulResponse {
    success: boolean,
    error: string,
    validation_error?: Array<ValidationError>
}

export interface IListResponse<T> {
    total: number,
    limit: number,
    page: number,
    items: Array<T>,
    loading: boolean
}