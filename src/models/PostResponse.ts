import {Post} from './Post.ts';

export interface PostResponse {
  data: Post[];
  limit: number;
  page: number;
  nextPage: number;
  prevPage: number;
}
