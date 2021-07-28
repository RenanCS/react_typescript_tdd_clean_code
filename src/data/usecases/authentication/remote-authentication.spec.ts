import { HttpPostClientMock } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientMock: HttpPostClientMock
}

const makeSutFactory = (url: string = 'any-url'): SutTypes => {
    const httpPostClientMock = new HttpPostClientMock();
    const sut = new RemoteAuthentication(url, httpPostClientMock);
    return {
        sut,
        httpPostClientMock
    }
}

describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with correct URL', () => {
        const url = 'other_url';
        const { sut, httpPostClientMock } = makeSutFactory(url);
        sut.auth();
        expect(httpPostClientMock.url).toBe(url);
    })
})