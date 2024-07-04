import {Method, request} from '../axiosClient';
import endPoint from '../endPoint';
import {MusicResponse} from '../../models/MusicResponse.ts';

export const getMusics = (limit?: number, page?: number) =>
  request<MusicResponse>(endPoint().getListMusic, Method.GET, {
    limit,
    page,
  });
