import { createSlice } from "@reduxjs/toolkit";
import type { InitialStateType } from "../../interface/book.interface";
import {
  createBook,
  deleteBook,
  //   deleteAllBooks,
  getAllBook,
  updateBook,
} from "../../apis/book.apis";

const initialState: InitialStateType = {
  status: "idle",
  data: [],
  error: null,
  book: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    getBookDetail(state, action) {
      state.book = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllBook.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllBook.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.data = state.data.filter((book) => book.id !== action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.data = state.data.map((book) =>
          book.id === action.payload.id ? action.payload : book
        );
      });
  },
});

export default bookSlice.reducer;
export const { getBookDetail } = bookSlice.actions;
