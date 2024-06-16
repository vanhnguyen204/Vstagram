import {Music} from './Music.ts';

export interface MusicResponse {
  data: Music[];
  limit: number;
  page: number;
  nextPage: number;
  prevPage: number;
}
