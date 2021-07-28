
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { HttpPostClientMock } from "@/data/test/mock-http-client";
import { InvalidCredencialErro } from "@/domain/errors/invalid-credentials-error";
import { mockAuthentication } from "@/domain/test/mock-authentication";
import faker from 'faker';
import { RemoteAuthentication } from "./remote-authentication";

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientMock: HttpPostClientMock
}

const makeSutFactory = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientMock = new HttpPostClientMock();
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
            statusCode: HttpStatusCode.unathorized
        }
        const promise =  sut.auth(mockAuthentication());
        expect(promise).rejects.toThrow(new InvalidCredencialErro());
    })
})

