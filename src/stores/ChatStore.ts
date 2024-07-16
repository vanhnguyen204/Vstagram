import {Conversation} from '../models/Chat.ts';
import {makeAutoObservable} from 'mobx';
import {getListConversation} from '../services/apis/chatServices.ts';
export interface ChatStoreType {
  data: Conversation[];
  limit: number;
  page: number | null;
  prevPage: number | null;
  nextPage: number | null;
}
class ChatStore {
  store: ChatStoreType = {
    data: [],
    limit: 0,
    page: 0,
    prevPage: 0,
    nextPage: 0,
  };
  constructor() {
    makeAutoObservable(this);
  }
  *fetchConversation(limit: number, page: number) {
    try {
      const data: ChatStoreType = yield getListConversation(limit, page);
      console.log(data);
      this.store.page = data.page ?? null;
      this.store = this.store.data.concat(data.data);
      this.store.prevPage = data.prevPage ?? null;
      this.store.nextPage = data.nextPage ?? null;
    } catch (e) {
      console.log('error: ', e);
    }
  }
}

export default new ChatStore();
