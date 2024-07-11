import {Chat} from '../models/Chat.ts';
import {io, Socket} from 'socket.io-client';
import {create} from 'zustand';
import {ProdConfig} from '../config/AxiosConfig.ts';
import {activeUserActivity} from '../services/apis/socketService.ts';
import {getDataAsyncStorage} from '../utils/AsyncStorage.ts';
import {ACCESS_USER_ID} from '../constants/AsyncStorage.ts';
import {showNotification} from '../config/PushNotification.ts';
import {UserConversation} from '../models/User.ts';

export interface OnlineUserType {
  userId: string;
  avatar: string;
  name: string;
}
export interface ConversationType {
  data: Chat[];
  prevPage: number;
  nextPage: number;
  page: number;
  limit: number;
}
export interface ChatNotification extends Chat {
  userName: string;
}
interface ChatStoreTypes {
  socket: Socket;
  isConnected: boolean;
  onlineUsers: OnlineUserType[];
  conversationDetails: ConversationType;
  conversations: ConversationType[];
  allUser: UserConversation[];
}

interface ChatStoreActions extends ChatStoreTypes {
  initialSocketIO: (socket: Socket, userId: string) => void;
  sendMessage: (chat: Chat, userName: string, socket: Socket) => void;
  setConversations: (conversations: ConversationType[]) => void;
  setAllUser: (allUser: UserConversation[]) => void;
  setConversationDetails: (conversation: ConversationType) => void;
  addNewConversation: (chat: Chat) => void;
}

export const useChatStore = create<ChatStoreActions>(set => ({
  socket: io(ProdConfig.SOCKET_URL, {
    autoConnect: true,
    timeout: 10000,
  }),
  allUser: [],
  setAllUser: (allUser: UserConversation[]) => set({allUser}),
  isConnected: false,
  onlineUsers: [],
  conversationDetails: {
    data: [],
    limit: 0,
    page: 0,
    nextPage: 0,
    prevPage: 0,
  },
  setConversationDetails: (conversation: ConversationType) =>
    set({conversationDetails: conversation}),
  addNewConversation: (chat: Chat) =>
    set(state => ({
      conversationDetails: {
        ...state.conversationDetails,
        data: [chat, ...state.conversationDetails.data],
      },
    })),
  conversations: [],
  setConversations: (conversations: ConversationType[]) => set({conversations}),
  sendMessage: async (chat: Chat, userName: string, socket: Socket) => {
    const userId = await getDataAsyncStorage(ACCESS_USER_ID);
    socket.emit('sendMessage', {
      ...chat,
      userIdSent: userId,
      userName,
    });
  },
  initialSocketIO: async (socket: Socket, userId: string) => {
    const getUserId = await getDataAsyncStorage(ACCESS_USER_ID);
    // Event listeners
    socket.on('connect', () => {
      console.log('User connected to socket.io server');
      activeUserActivity('online')
        .then(res => {
          if (res.code === 200) {
            set({isConnected: true});
          }
        })
        .catch(e => {
          console.log(e);
        });
    });
    socket.emit('register', userId);

    socket.on('onlineUsers', (onlineUsers: OnlineUserType[]) => {
      const filterUser = onlineUsers.filter(item => {
        return item.userId !== getUserId;
      });
      set({onlineUsers: filterUser});
    });
    socket.on('newMessage', (message: Chat) => {
      console.log('New message received:', message.message);
      useChatStore.getState().addNewConversation(message);
      if (message.userIdReceived === getUserId) {
        showNotification(
          'userName',
          typeof message.message === 'string' ? message.message : 'hello',
        );
      }
    });
    socket.on('disconnect', () => {
      // console.log('User disconnected from socket.io server');
      activeUserActivity('offline')
        .then(res => {
          if (res.code === 200) {
            set({isConnected: false});
          }
        })
        .catch(e => {
          console.log(e);
        });
    });
    // Clean up listeners on unmount or disconnection
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('onlineUsers');
      socket.off('newMessage');
    };
  },
}));
