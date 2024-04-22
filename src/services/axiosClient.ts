import axios from 'axios';
import {ProdConfig} from '../config/AxiosConfig.ts';

const axiosClient = axios.create({
  baseURL: ProdConfig.BASE_URL,
  timeout: 10000,
});

axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers,
  };

  config.data;
  return config;
});
axiosClient.interceptors.response.use(
  res => {
    if (res.data) {
      return res.data;
    }

    throw Error('Error response from axios');
  },
  error => {
    console.log(`Error api ${JSON.stringify(error)}`);
    throw new Error(error.response);
  },
);
export const request = async (url: string, method: string, data: any) => {
  try {
    const response =  await axiosClient.request({
      url,
      method,
      data,
    });
    return response;
  } catch (error) {
    handleLogError(error);
  }
};
export const uploadRequest = async (url: string, data: object) => {
  try {
    const response = await axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (e) {
    handleLogError(e);
  }
};
const handleLogError = (error: any): void => {
  console.log(error);
};
export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  OPTIONS: 'OPTION',
  HEAD: 'head',
  PATCH: 'PATCH',
};
export default axiosClient;
