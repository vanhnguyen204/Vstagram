import {Post} from '../models/Post.ts';
import {create} from 'zustand';
import {mockPost} from '../models/Mockup.ts';

interface PostStoreType {
  posts: Post[];
}
interface PostStoreActions extends PostStoreType {
  setPosts: (posts: Post[]) => void;
  addNewPost: (post: Post) => void;
  removePost: (postId: string) => void;
}

export const usePostStore = create<PostStoreActions>(setState => ({
  posts: mockPost,
  setPosts: (posts: Post[]) => setState({posts}),
  addNewPost: (post: Post) =>
    setState(state => ({
      posts: state.posts.concat(post),
    })),
  removePost: (postId: string) =>
    setState(state => ({
      posts: state.posts.filter(item => item._id !== postId),
    })),
}));
