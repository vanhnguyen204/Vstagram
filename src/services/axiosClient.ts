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
    throw new Error(JSON.stringify(error.response));
  },
);
export const request = async (url: string, method: string, data: any) => {
  try {
    const response = await axiosClient.request({
      url,
      method,
      data,
    });
    return response;
  } catch (error: any) {
    handleLogError(error, url, method);
    throw error;
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
    handleLogError(e, url, 'POST');
  }
};
const handleLogError = (error: any, url: string, method: string): void => {
  console.log(`Error in API call ${method} ${url}`);
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
