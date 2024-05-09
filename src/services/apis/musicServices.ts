import {Method, request} from '../axiosClient';
import endPoint from '../endPoint';

export const getListMusic = () => request(endPoint().getListMusic, Method.GET);
