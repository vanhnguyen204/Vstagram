import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';
import {User} from '../../models/User.ts';
import {MessageResponse} from '../../models/MessageResponse.ts';

export const register = (email: string) =>
  request<MessageResponse>(endPoint().register, Method.POST, {email});
export const verifyCode = (email: string, codeRegister: number) =>
  request<MessageResponse>(endPoint().verifyCode, Method.POST, {
    email,
    codeRegister,
  });
export const createAccount = (data: object) =>
  request(endPoint().confirmRegisterAccount, Method.POST, data);
export const login = (email: string, passWord: string) =>
  request<User>(endPoint().login, Method.POST, {}, {email, passWord});

export const getUserInformation = () =>
  request<User>(endPoint().getUserInformation, Method.GET);
