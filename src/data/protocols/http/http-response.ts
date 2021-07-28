export enum HttpStatusCode {
    unathorized = 401,
    noContent = 201
}

export type HttpResponse = {
    statusCode: HttpStatusCode
    body?: any
}