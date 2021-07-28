
import { HttpStatusCode } from "@/data/protocols/http";
import { HttpPostClientMock } from "@/data/test";
import { InvalidCredencialErro,UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { mockAccountModel, mockAuthentication } from "@/domain/test";
import { AuthenticationParams } from "@/domain/usecases";
import faker from 'faker';
import { RemoteAuthentication } from "./remote-authentication";

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientMock: HttpPostClientMock<AuthenticationParams, AccountModel>
}

const makeSutFactory = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientMock = new HttpPostClientMock<AuthenticationParams, AccountModel>();
    const sut = new RemoteAuthentication(url, httpPostClientMock);
    return {
        sut,
        httpPostClientMock
    }
}

describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with correct URL', () => {
        const url = faker.internet.url();
        const { sut, httpPostClientMock } = makeSutFactory(url);
        sut.auth(mockAuthentication());
        expect(httpPostClientMock.url).toBe(url);
    })

    test('Should call HttpPostClient with correct body', () => {
        const { sut, httpPostClientMock } = makeSutFactory();
        const authenticationParams = mockAuthentication();
        sut.auth(authenticationParams);
        expect(httpPostClientMock.body).toEqual(authenticationParams);
    })

    
    test('Should throw InvalidCredentialsError if HttpPostClient return 401', () => {
        const { sut, httpPostClientMock } = makeSutFactory();
        httpPostClientMock.response = {
            statusCode: HttpStatusCode.unauthorized
        }
        const promise =  sut.auth(mockAuthentication());
        expect(promise).rejects.toThrow(new InvalidCredencialErro());
    })

    test('Should throw unexpectedError if HttpPostClient return 400', () => {
        const { sut, httpPostClientMock } = makeSutFactory();
        httpPostClientMock.response = {
            statusCode: HttpStatusCode.badRequest
        }
        const promise =  sut.auth(mockAuthentication());
        expect(promise).rejects.toThrow(new UnexpectedError());
    })

    test('Should throw unexpectedError if HttpPostClient return 404', () => {
        const { sut, httpPostClientMock } = makeSutFactory();
        httpPostClientMock.response = {
            statusCode: HttpStatusCode.notFound
        }
        const promise =  sut.auth(mockAuthentication());
        expect(promise).rejects.toThrow(new UnexpectedError());
    })

    test('Should throw unexpectedError if HttpPostClient return 500', () => {
        const { sut, httpPostClientMock } = makeSutFactory();
        httpPostClientMock.response = {
            statusCode: HttpStatusCode.serverError
        }
        const promise =  sut.auth(mockAuthentication());
        expect(promise).rejects.toThrow(new UnexpectedError());
    })

    test('Should return an AccountModel if HttpPostClient return 200', async () => {
        const { sut, httpPostClientMock } = makeSutFactory();
        const httpResult = mockAccountModel();
        httpPostClientMock.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        }
        const account = await sut.auth(mockAuthentication());
        expect(account).toEqual(httpResult);
    })
})

