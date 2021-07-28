import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { InvalidCredencialErro } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpecte-error";
import { AccountModel } from "@/domain/models/account-model";
import { AuthenticationParams } from "@/domain/usecases/authentications";


export class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpPostClient<AuthenticationParams, AccountModel>
    ) { }

    async auth(params: AuthenticationParams): Promise<void> {
        const httpResponse = await this.httpClient.post({url: this.url, body: params});

        switch(httpResponse.statusCode){
            case HttpStatusCode.ok: break;
            case HttpStatusCode.unathorized: throw new InvalidCredencialErro();
            default: throw new UnexpectedError();
        }
    }
}