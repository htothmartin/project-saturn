import { Comment } from "@/model/comment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CommentState = {
  comments: Comment[];
  isCommentsFetching: boolean;
};

const initialState: CommentState = {
  comments: [],
  isCommentsFetching: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    fetchComments: (
      state: CommentState,
      _: PayloadAction<{ projectId: string; ticketId: string }>,
    ) => {
      state.isCommentsFetching = true;
    },
    fetchCommentsSuccess: (
      state: CommentState,
      action: PayloadAction<Comment[]>,
    ) => {
      state.isCommentsFetching = false;
      state.comments = action.payload;
    },
    fetchCommentsError: (state: CommentState) => {
      state.isCommentsFetching = false;
    },
  },
});

export const { fetchComments, fetchCommentsSuccess, fetchCommentsError } =
  commentSlice.actions;

export default commentSlice.reducer;
