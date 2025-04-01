import { Comment } from "@/model/comment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearUserData } from "../session/session-slice";

type CommentState = {
  comments: Comment[] | null;
  isCommentsFetching: boolean;
};

const initialState: CommentState = {
  comments: null,
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
      state.comments = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearUserData, () => initialState);
  },
});

export const { fetchComments, fetchCommentsSuccess, fetchCommentsError } =
  commentSlice.actions;

export default commentSlice.reducer;
