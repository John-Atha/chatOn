import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import snackMessage from "./slices/snackMessage";

const RootReducer = combineReducers({
  auth,
  snackMessage,
});

export default RootReducer;
