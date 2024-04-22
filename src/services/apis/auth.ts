import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';

export const register = (data: object) =>
  request(endPoint().register, Method.POST, data);
export const verifyCode = (code: string) =>
  request(endPoint().verifyCode, Method.POST, code);
