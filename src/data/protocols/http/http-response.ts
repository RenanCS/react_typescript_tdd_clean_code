export enum HttpStatusCode {
    ok = 200,
    noContent = 201,
    badRequest = 400,
    unathorized = 401
}

export type HttpResponse = {
    statusCode: HttpStatusCode
    body?: any
}