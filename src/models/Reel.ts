import {Comment} from './Comment.ts';
import {Media} from './Media.ts';

export interface Reel extends Media {
  videoURL: string;
}
