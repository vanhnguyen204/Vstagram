import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';
import {MessageResponse} from '../../models/MessageResponse.ts';
import {hiddenModalLoading, showModalLoading} from '../../hooks';
import {Post} from '../../models/Post.ts';
import {PostResponse} from '../../models/PostResponse.ts';

export const createPost = async (formData: FormData) => {
  try {
    showModalLoading();
    const res = await request<MessageResponse>(
      endPoint().createPost,
      Method.POST,
      {},
      formData,
    );
    hiddenModalLoading();
    return res;
  } catch (e) {
    console.log(e);
    hiddenModalLoading();
  }
};

export const getPosts = async (limit: number, page: number) => {
  try {
    return await request<PostResponse>(endPoint().getPosts, Method.GET, {
      limit,
      page,
    });
  } catch (e) {
    console.log(e);
  }
};
