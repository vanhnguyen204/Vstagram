import {Comment} from './Comment.ts';
import {Reel} from './Reel.ts';
import {Media} from './Media.ts';
export enum PostType {
  PHOTO,
  VIDEO,
}
export interface Post extends Media {
  type: PostType;
  images: string[];
  videoURL: string;
}
