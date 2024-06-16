import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';
import { User } from "../../models/UserModel.ts";

export const register = (data: object) =>
  request(endPoint().register, Method.POST, data);
export const verifyCode = (data: object) =>
  request(endPoint().verifyCode, Method.POST, data);
export const createAccount = (data: object) =>
  request(endPoint().confirmRegisterAccount, Method.POST, data);
export const login = (data: object) =>
  request(endPoint().login, Method.POST, data);

export const getUserInformation = () =>
  request<User>(endPoint().getUserInformation, Method.GET);
