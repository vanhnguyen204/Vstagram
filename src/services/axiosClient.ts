import axios from "axios";
import { ProdConfig } from "../config/AxiosConfig.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN } from "../constants/AsyncStorage.ts";

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
    // Check if the response has a data property
    if (response.data) {
      return response.data;
    }
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
  data?: any,
): Promise<T> => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    const dataResponse: any = await axiosClient.request<T>({
      url,
      method,
      data,
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
export const uploadRequest = async (
  url: string,
  data: object,
  authToken: any,
) => {
  try {
    const response = await axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
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
