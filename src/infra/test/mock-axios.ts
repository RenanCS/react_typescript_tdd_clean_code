import axios from "axios"
import faker from "faker"

const mockAxios = axios as jest.Mocked<typeof axios>;

export const mockAxiosPost = (): jest.Mocked<typeof axios> =>  {

    const mockedAxiosResult = {
        data: faker.random.objectElement(),
        status: faker.datatype.number()
    }

    mockAxios.post.mockResolvedValue(mockedAxiosResult);

    return mockAxios;
}