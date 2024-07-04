import {Post} from '../models/Post.ts';
import {create} from 'zustand';
import {mockPost} from '../models/Mockup.ts';
import {PostResponse} from '../models/PostResponse.ts';

interface PostStoreType {
  posts: PostResponse;
}
interface PostStoreActions extends PostStoreType {
  setPosts: (posts: PostResponse) => void;
  addNewPost: (post: Post) => void;
  removePost: (postId: string) => void;
}

export const usePostStore = create<PostStoreActions>(setState => ({
  posts: {
    data: mockPost,
    limit: 0,
    page: 0,
    prevPage: 0,
    nextPage: 1,
  },
  setPosts: (posts: PostResponse) =>
    setState(state => ({
      posts: {
        data: state.posts.data.concat(...posts.data),
        limit: posts.limit,
        nextPage: posts.nextPage,
        prevPage: posts.prevPage,
        page: posts.page,
      },
    })),
  addNewPost: (post: Post) =>
    setState(state => ({
      posts: {
        ...state.posts,
        data: state.posts.data.concat(post),
      },
    })),
  removePost: (postId: string) =>
    setState(state => ({
      posts: {
        ...state.posts,
        data: state.posts.data.filter(item => item._id !== postId),
      },
    })),
}));
