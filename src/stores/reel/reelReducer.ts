import {Reel} from '../../models/Reel.ts';
import {ReelActions, ReelActionEnum} from './reelActions.ts';

export interface ReelStoreType {
  data: Reel[];
  limit: number;
  page: number;
  nextPage: number;
  prevPage: number;
}

const initialValue: ReelStoreType = {
  data: [],
  limit: 5,
  page: 1,
  nextPage: 2,
  prevPage: 0,
};

export const reelReducer = (
  state: ReelStoreType = initialValue,
  action: ReelActions,
): ReelStoreType => {
  switch (action.type) {
    case ReelActionEnum.GET_REEL:
      return {
        data: state.data.concat(action.payload.data.data),
        limit: action.payload.data.limit,
        page: action.payload.data.page,
        nextPage: action.payload.data.nextPage,
        prevPage: action.payload.data.prevPage,
      };
    default:
      return state;
  }
};
