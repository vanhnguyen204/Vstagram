import {Comment} from './Comment.ts';

export interface Media {
  _id: string;
  userId: string;
  avatar: string;
  name: string;
  description: string;
  like: number;
  comment: Comment[];
  isLike: boolean;
  music?: string;
  isFollowed: boolean;
  timeCreate?: string;
}
