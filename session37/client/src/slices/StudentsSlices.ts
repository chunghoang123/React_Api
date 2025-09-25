import { createAsyncThunk, createSlice, type PayloadAction,} from "@reduxjs/toolkit";
import { type Student } from "../types/type";
import * as api from "../apis/studentsApi";

interface StudentsState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentsState = {
  students: [],
  loading: false,
  error: null,
};

// ✅ Gọi API bằng createAsyncThunk
export const fetchStudents = createAsyncThunk("students/fetch", async () => {
  const res = await api.getStudents();
  return res.data;
});

export const addStudentAsync = createAsyncThunk("students/add", async (student: Omit<Student, "id">) => {
  const res = await api.addStudent(student);
  return res.data;
});

export const updateStudentAsync = createAsyncThunk("students/update", async (student: Student) => {
  const res = await api.updateStudent(student);
  return res.data;
});

export const deleteStudentAsync = createAsyncThunk("students/delete", async (id: number) => {
  await api.deleteStudent(id);
  return id;
});

// ✅ Slice
const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.students[index] = action.payload;
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.students = state.students.filter(s => s.id !== action.payload);
      });
  },
});

export default studentsSlice.reducer;
