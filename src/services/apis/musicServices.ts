import {Method, request} from '../axiosClient';
import endPoint from '../endPoint';
import {MusicResponse} from '../../models/MusicResponse.ts';

export const getMusics = (limit?: string, page?: string) =>
  request<MusicResponse>(endPoint().getListMusic, Method.GET, {
    limit: limit,
    page: page,
  });
