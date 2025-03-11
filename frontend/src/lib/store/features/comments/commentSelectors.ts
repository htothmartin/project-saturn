import { RootState } from '../../store';

export const selectComments = (state: RootState) => state.comment.comments;

export const selectIsCommentsFetching = (state: RootState) =>
  state.comment.isCommentsFetching;
