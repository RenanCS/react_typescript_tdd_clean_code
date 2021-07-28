import { AxiosHttpClient } from "./axios-http-client";
import axios from 'axios'
import faker from 'faker'
import { HttpPostParams } from "@/data/protocols/http";

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

const mockedAxiosResult = {
    data: faker.random.objectElement(),
    status: faker.datatype.number()
}

mockAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSurFactory = () : AxiosHttpClient => {
    return new AxiosHttpClient();
}

const mockPostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
    test('Should call axios with correct values', async () => {
        const request = mockPostRequest();
        const sut = makeSurFactory();
        await sut.post(request);
        expect(mockAxios.post).toHaveBeenCalledWith(request.url, request.body);
    })

    test('Should call axios with correct values', async () => {
        const sut = makeSurFactory();
       const httpResponse =  await sut.post(mockPostRequest());
        expect(httpResponse).toEqual({
            statusCode: mockedAxiosResult.status,
            body : mockedAxiosResult.data
        });
    })
})