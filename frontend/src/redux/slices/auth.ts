import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkLoggedCall } from "../../api/auth";
import { RootState } from "../store";

interface AuthState {
  user: any;
  status: "idle" | "loading";
}
const initialState: AuthState = {
  user: null,
  status: "idle",
};

const checkLogged = createAsyncThunk("auth/checkLogged", async () => {
  try {
    const user = await checkLoggedCall();
    return user;
  } catch (err) {
    return null;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogged.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(checkLogged.fulfilled, (state, action) => {
        state.status = "idle";
        const user = action.payload;
        state.user = user;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
