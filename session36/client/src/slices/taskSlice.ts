import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Task {
  id: number;
  taskName: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

interface TaskState {
  list: Task[];
  search: string;
  filterStatus: "all" | "completed" | "incomplete";
  filterPriority: "all" | "High" | "Medium" | "Low";
  loading: boolean;
}

const initialState: TaskState = {
  list: [],
  search: "",
  filterStatus: "all",
  filterPriority: "all",
  loading: false,
};

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await axios.get<Task[]>("http://localhost:8080/tasks");
  return res.data;
});

export const addTask = createAsyncThunk("tasks/add", async (task: Omit<Task, "id">) => {
  const res = await axios.post<Task>("http://localhost:8080/tasks", task);
  return res.data;
});

export const deleteTask = createAsyncThunk("tasks/delete", async (id: number) => {
  await axios.delete(`http://localhost:8080/tasks/${id}`);
  return id;
});

export const updateTask = createAsyncThunk("tasks/update", async (task: Task) => {
  const res = await axios.put<Task>(`http://localhost:8080/tasks/${task.id}`, task);
  return res.data;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFilterStatus(state, action: PayloadAction<TaskState["filterStatus"]>) {
      state.filterStatus = action.payload;
    },
    setFilterPriority(state, action: PayloadAction<TaskState["filterPriority"]>) {
      state.filterPriority = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => { state.loading = false; })
      // Add
      .addCase(addTask.pending, (state) => { state.loading = true; })
      .addCase(addTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.loading = false;
      })
      .addCase(addTask.rejected, (state) => { state.loading = false; })
      // Delete
      .addCase(deleteTask.pending, (state) => { state.loading = true; })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state) => { state.loading = false; })
      // Update
      .addCase(updateTask.pending, (state) => { state.loading = true; })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
        state.loading = false;
      })
      .addCase(updateTask.rejected, (state) => { state.loading = false; });
  },
});

export const { setSearch, setFilterStatus, setFilterPriority } = taskSlice.actions;
export default taskSlice.reducer;
