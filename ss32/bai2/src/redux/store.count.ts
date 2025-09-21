import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer";
import counterReducer from "./counterReducer";

const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
