import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/auth";

const RootReducer = combineReducers({
  auth,
});

export default RootReducer;
