import axios from 'axios';
import {ProdConfig} from '../config/AxiosConfig.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../constants/AsyncStorage.ts';

const axiosClient = axios.create({
  baseURL: ProdConfig.BASE_URL,
  timeout: 10000,
});

axiosClient.interceptors.request.use(async config => {
  const token = (await AsyncStorage.getItem(ACCESS_TOKEN)) || '';
  // @ts-ignore
  config.headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...config.headers,
  };
  return config;
});
axiosClient.interceptors.response.use(
  response => {
    if (response.data) {
      return response.data;
    }
    console.log(response);
    return response;
  },
  error => {
    if (error.response) {
      return Promise.reject(error.response);
    } else if (error.request) {
      return Promise.reject(new Error('No response received'));
    } else {
      return Promise.reject(new Error(error.message));
    }
  },
);

export const request = async <T>(
  url: string,
  method: string,
  params?: {},
  data?: any,
): Promise<T> => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);

    const dataResponse: any = await axiosClient.request<T>({
      url,
      method,
      data,
      params: params,
      headers: {
        Authorization: `Bear ${token}`,
      },
    });

    return dataResponse;
  } catch (error: any) {
    handleLogError(error, url, method);

    throw error;
  }
};
export const uploadRequest = async <T>(
  url: string,
  data: object,
): Promise<T> => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    const response: any = await axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (e) {
    handleLogError(e, url, 'POST');
    throw e;
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
