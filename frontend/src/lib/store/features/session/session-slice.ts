import { User } from "@/model/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SessionState = {
  currentUser: User | null;
  accessToken: string | null;
  isAuthenticating: boolean;
};

const initialState: SessionState = {
  currentUser: null,
  accessToken: null,
  isAuthenticating: true,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    fetchCurrentUser: (_: SessionState) => {},
    setCurrentUser: (state: SessionState, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticating = false;
    },
    setAccessToken: (state: SessionState, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      if (state.isAuthenticating) {
        state.isAuthenticating = false;
      }
    },
    logout: (state: SessionState) => {
      state.currentUser = null;
      state.accessToken = null;
      state.isAuthenticating = true;
    },
  },
});

export const { fetchCurrentUser, setCurrentUser, setAccessToken, logout } =
  sessionSlice.actions;

export default sessionSlice.reducer;
