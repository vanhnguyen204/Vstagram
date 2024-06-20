import {Media} from './Media.ts';

export interface Story {
  _id: string;
  music: string;
  duration: number;
  video: string;
  userId: string;
  image: string;
  type: string;
  timeCreated: string;
}
