import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';
import {MessageResponse} from '../../models/MessageResponse.ts';

export const createPost = (formData: FormData) =>
  request<MessageResponse>(endPoint().createPost, Method.POST, {}, formData);
