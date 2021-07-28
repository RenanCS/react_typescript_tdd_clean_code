import { HttpPostClientMock } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";


describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with correct URL', () => {
        const url = 'any-url';
        const httpPostClientMock = new HttpPostClientMock();
        const sut = new RemoteAuthentication(url, httpPostClientMock);
        sut.auth();
        expect(httpPostClientMock.url).toBe(url);
    })
})