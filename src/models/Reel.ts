import {Comment} from './Comment.ts';

export interface Reel {
  _id: string;
  userId: string;
  avatar: string;
  name: string;
  description: string;
  videoURL: string;
  like: number;
  comment: Comment[];
  isLike: boolean;
}
