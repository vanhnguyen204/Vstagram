import {makeAutoObservable} from 'mobx';
import {getReels} from '../services/apis/reelServices.ts';
import {Reel} from '../models/Reel.ts';

class ReelStore {
  reels: Reel[] = [];
  reelPage: number;

  constructor() {
    makeAutoObservable(this);
  }

  *fetchReels(limit?: number = 5) {
    try {
      const data = yield getReels(limit, this.reelPage);
      console.log(data);
    } catch (e) {
      console.log('Error fetch reel');
    }
  }
}

export default new ReelStore();
