import {Method, request} from '../axiosClient.ts';
import {Reel} from '../../models/Reel.ts';
import endPoint from '../endPoint.ts';
import {ReelStoreType} from '../../stores/reel/reelReducer.ts';

const getReels = (limit: number = 5, page: number = 1) =>
  request<ReelStoreType[]>(endPoint().getReels, Method.GET, {
    limit,
    page,
  });

export {getReels};
