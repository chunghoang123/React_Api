import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "../slices/book.slices";
const store = configureStore({
  reducer: {
    book: bookSlice,
  },
});

export default store;

// Định nghĩa type cho dispatch và selector
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
