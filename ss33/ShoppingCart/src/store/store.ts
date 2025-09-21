import { combineReducers, createStore } from "redux";
import { foodreducer } from "../reducer/foodreducer";
import type { food } from "../types/interface";

const saved = localStorage.getItem("foods");
export const initialState: food[] = saved ? JSON.parse(saved) : [];
const RootData = combineReducers({
  foodlist: foodreducer,
});
export const store = createStore(RootData);

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("foods", JSON.stringify(state.foodlist));
});

export type RootState = ReturnType<typeof RootData>;
