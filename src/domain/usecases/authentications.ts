import { AccountModel } from "../models/account-model";

export interface AuthenticationParams {
    email: string;
    password: string;
}

export interface Authentications {
    auth (params: AuthenticationParams): Promise<AccountModel>
}

