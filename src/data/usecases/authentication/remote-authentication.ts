import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { InvalidCredencialErro } from "@/domain/errors/invalid-credentials-error";
import { AuthenticationParams } from "@/domain/usecases/authentications";


export class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpPostClient
    ) { }

    async auth(params: AuthenticationParams): Promise<void> {
        const httpResponse = await this.httpClient.post({url: this.url, body: params});

        switch(httpResponse.statusCode){
            case HttpStatusCode.unathorized: throw new InvalidCredencialErro();
            default: return Promise.resolve();
        }
    }
}