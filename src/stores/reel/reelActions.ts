import {getReels} from '../../services/apis/reelServices.ts';
import {Reel} from '../../models/Reel.ts';
import {ReelStoreType} from './reelReducer.ts';

export enum ReelActionEnum {
  GET_REEL = 'GET_REEL',
}

export interface GetReelsAction {
  type: ReelActionEnum.GET_REEL;
  payload: {
    data: ReelStoreType;

  };
}

export type ReelActions = GetReelsAction;

export const handleGetReels =
  (limit: number = 5, nextPage: number = 1) =>
  async dispatch => {
    try {
      const dataResponse = await getReels(limit, nextPage);
      dispatch({
        type: ReelActionEnum.GET_REEL,
        payload: {
          data: dataResponse,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
