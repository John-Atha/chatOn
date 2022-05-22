import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    login: (state: AuthState, action: PayloadAction<any>) => {
      const { token, user } = action.payload;
      localStorage.setItem('token', token);
      state.user = user;
    },
    logout: (state: AuthState) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogged.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(checkLogged.fulfilled, (state, action) => {
      state.status = "idle";
      const user = action.payload;
      state.user = user;
    });
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
