import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';
import {ConversationType} from '../../hooks/useChatStore.ts';
import {Conversation} from '../../models/Chat.ts';
import ChatStore, { ChatStoreType } from "../../stores/ChatStore.ts";

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
const getListConversation = (limit: number, page: number) =>
  request<ChatStoreType>(endPoint().getListConversations, Method.GET, {
    limit,
    page,
  });
export {getConversations, getConversationDetails, getListConversation};
