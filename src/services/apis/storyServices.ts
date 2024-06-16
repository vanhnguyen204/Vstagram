import { Method, request, uploadRequest } from "../axiosClient.ts";
import endPoint from '../endPoint.ts';

export const handleUpStory = (data: FormData, authToken: any) =>
  uploadRequest(endPoint().createStory, data, authToken);
