
import { mockAxiosPost } from "@/infra/test";
import { AxiosHttpClient } from "./axios-http-client";
import axios from 'axios';
import { mockPostRequest } from "@/data/test";

jest.mock('axios')

type SutTypes = {
    sut: AxiosHttpClient
    mockedAxios : jest.Mocked<typeof axios>
}

const makeSurFactory = () : SutTypes => {
    const sut = new AxiosHttpClient();
    const mockedAxios = mockAxiosPost();
    return {
        sut,
        mockedAxios
    }
}


describe('AxiosHttpClient', () => {
    test('Should call axios with correct values', async () => {
        const request = mockPostRequest();
        const {sut, mockedAxios} = makeSurFactory();
        await sut.post(request);
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    })

    test('Should call axios with correct values', async () => {
        const {sut, mockedAxios} = makeSurFactory();
       const promise =  sut.post(mockPostRequest());
        expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    })
})