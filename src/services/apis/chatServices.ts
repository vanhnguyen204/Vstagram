import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';
import { ConversationType } from "../../hooks/useChatStore.ts";

const getConversations = (userIdSent: string, userIdReceived: string[]) =>
  request<ConversationType[]>(endPoint().getConversations, Method.GET, {
    userIdSent,
    userIdReceived,
  });

const getConversationDetails = (userIdSent: string, userIdReceived: string) =>
  request<ConversationType>(endPoint().getConversationDetails, Method.GET, {
    userIdSent,
    userIdReceived,
  });
export {getConversations, getConversationDetails}
