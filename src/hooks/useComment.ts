import {Comment} from '../models/Comment.ts';
import {create} from 'zustand';

interface CommentType {
  visible: boolean;
  comments: Comment[];
}

interface CommentActions extends CommentType {
  setVisible: () => void;
  setComments: (comments: Comment[]) => void;
  addNewComment: (newComment: Comment) => void;
}

export const useComment = create<CommentActions>(setState => ({
  visible: false,
  comments: [],
  setVisible: () => setState(state => ({visible: !state.visible})),
  setComments: (comments: Comment[]) => setState({comments}),
  addNewComment: (newComment: Comment) =>
    setState(state => ({
      comments: state.comments.concat(newComment),
    })),
}));
