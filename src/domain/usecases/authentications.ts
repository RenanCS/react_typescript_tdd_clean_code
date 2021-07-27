import { AccountModel } from "domain/models/account-model";

type AutenticationParams = {
    email: string
    password : string;
}

export interface Authentications {
    auth (params: AutenticationParams): Promise<AccountModel>
}