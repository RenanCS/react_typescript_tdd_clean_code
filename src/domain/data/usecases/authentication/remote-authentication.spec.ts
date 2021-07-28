import { HttpPostClient } from "domain/data/protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";


describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with correct URL', () => {
      
        class HttpPostClientMock implements HttpPostClient {
            url?: string;

            async post(url: string): Promise<void> {
                this.url = url;
                return Promise.resolve();
            }
        }

        const url = 'any-url';
        const httpPostClientMock = new HttpPostClientMock();
        const sut = new RemoteAuthentication(url, httpPostClientMock);
        sut.auth();
        expect(httpPostClientMock.url).toBe(url);
    })
})