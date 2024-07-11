import {Comment} from './Comment.ts';
import {MediaType} from './Enum.ts';

interface Media {
  _id: string;
  userId: string;
  avatar: string;
  name: string;
  description: string;
  like: number;
  comment: Comment[];
  isLike: boolean;
  music: string;
  isFollowed: boolean;
  timeCreated?: string;
}

type MediaParams = {
  title: string;
  multipleImage: boolean;
  type: MediaType;
};

export type {Media, MediaParams};
