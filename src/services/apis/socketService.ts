import {Method, request} from '../axiosClient.ts';
import {MessageResponse} from '../../models/MessageResponse.ts';
import endPoint from '../endPoint.ts';

export const activeUserActivity = (activity: string) =>
  request<MessageResponse>(endPoint().activeUserActivity, Method.PATCH, {
    activity,
  });
