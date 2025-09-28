import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Book } from "../interface/book.interface";

export const getAllBook = createAsyncThunk(
  "book/getAllBook",
  async (input: string) => {
    const [byTitle, byAuthor, byYear, byCategory] = await Promise.all([
      axios.get<Book[]>(`http://localhost:8080/books?title_like=${input}`),
      axios.get<Book[]>(`http://localhost:8080/books?author_like=${input}`),
      axios.get<Book[]>(`http://localhost:8080/books?year=${input}`),
      axios.get<Book[]>(`http://localhost:8080/books?category=${input}`),
    ]);

    // Gộp dữ liệu lại và loại trùng
    const merged = [
      ...byTitle.data,
      ...byAuthor.data,
      ...byYear.data,
      ...byCategory.data,
    ];

    const unique = merged.filter(
      (item, index, self) => index === self.findIndex((b) => b.id === item.id)
    );

    return unique;
  }
);

export const createBook = createAsyncThunk(
  "book/createBook",
  async (s: Book) => {
    const response = await axios.post("http://localhost:8080/books", s);
    return response.data;
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/books/${id}`);
    return id;
  }
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  async (s: Book) => {
    const response = await axios.put(`http://localhost:8080/books/${s.id}`, s);
    return response.data;
  }
);
