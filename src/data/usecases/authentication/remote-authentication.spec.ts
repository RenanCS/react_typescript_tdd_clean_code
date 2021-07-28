import { HttpPostClientMock } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import faker from 'faker';
import { mockAuthentication } from "../../../domain/test/mock-authentication";

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
})

