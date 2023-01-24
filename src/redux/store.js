import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import questionReducer from "./reducers/questionReducer";
import imageReducer from "./reducers/imageReducer";
import alertReducer from "./reducers/alertReducer";
import { combineReducers } from "@reduxjs/toolkit";

const middleware = [thunk];
const preloadState = null;
const reducer = combineReducers({
  questionReducer,
  imageReducer,
  alertReducer
});
const store = configureStore({
  reducer,
  preloadState,
  middleware,
});

export default store;
