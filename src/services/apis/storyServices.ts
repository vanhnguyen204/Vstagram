import {Method, request, uploadRequest} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';
import {MessageResponse} from '../../models/MessageResponse.ts';
import {Story} from '../../models/Story.ts';

export const handleUpStory = (data: FormData) =>
  uploadRequest<MessageResponse>(endPoint().createStory, data);
export const getStories = () =>
  request<Story[]>(endPoint().getStories, Method.GET);
