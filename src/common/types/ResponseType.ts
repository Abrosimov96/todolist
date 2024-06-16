export type FieldError = {
    error: string
    field: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
    fieldsErrors: FieldError[]
}
