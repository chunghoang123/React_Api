import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "../slices/StudentsSlices";

export const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
