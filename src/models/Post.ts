import {Comment} from './Comment.ts';
import {Reel} from './Reel.ts';
import {Media} from './Media.ts';
export enum PostType {
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO',
}
export type PostImage = {
  type: PostType.PHOTO;
  images: string[];
};

export type PostVideo = {
  type: PostType.VIDEO;
  videoURL: string;
};
export interface Post extends Media {
  postType: PostImage | PostVideo;
}
