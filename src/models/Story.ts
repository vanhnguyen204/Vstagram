import {Media} from './Media.ts';
import {Music} from './Music.ts';

export interface Story {
  _id: string;
  music?: Music;
  duration: number;
  video: string;
  userId: string;
  image: string;
  type: string;
  timeCreated: string;
}
