import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store";
import {
  fetchStudents,
  deleteStudentAsync,
  addStudentAsync,
  updateStudentAsync,
} from "../slices/StudentsSlices";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import StudentsCard from "../components/StudentsCard";
import StudentsForm from "../components/StudentsForm";
import { type Student } from "../types/type";

const StudentsManage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students, loading } = useSelector(
    (state: RootState) => state.students
  );

  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("Tất cả");
  const [sort, setSort] = useState("asc");

  const [open, setOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const filtered = students
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .filter((s) => (grade === "Tất cả" ? true : s.grade === grade))
    .sort((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const handleClear = () => {
    setSearch("");
    setGrade("Tất cả");
    setSort("asc");
  };

  const handleSubmit = (student: Omit<Student, "id"> | Student) => {
    if ("id" in student) {
      dispatch(updateStudentAsync(student as Student));
    } else {
      dispatch(addStudentAsync(student as Omit<Student, "id">));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 shadow mt-[200px] rounded-xl">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        🎓 Student Manager
      </h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditingStudent(null);
          setOpen(true);
        }}
      >
        ADD STUDENT
      </Button>
      <div className="flex flex-wrap items-center gap-4 mb-6  mt-6 p-3 bg-white shadow-100  rounded-xl border border-gray-300  ">
        <TextField
        className="w-[400px]"
          label="Tìm theo tên"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Grade</InputLabel>
          <Select
            value={grade}
            label="Grade"
            onChange={(e) => setGrade(e.target.value)}
          >
            <MenuItem value="Tất cả">Tất cả</MenuItem>
            <MenuItem value="10A1">10A1</MenuItem>
            <MenuItem value="10A2">10A2</MenuItem>
            <MenuItem value="11B1">11B1</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Sắp xếp</InputLabel>
          <Select
            value={sort}
            label="Sắp xếp"
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="asc">Name A → Z</MenuItem>
            <MenuItem value="desc">Name Z → A</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined"  onClick={handleClear}>
          CLEAR
        </Button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((s: Student) => (
          <StudentsCard
            key={s.id}
            student={s}
            onDelete={() => dispatch(deleteStudentAsync(s.id))}
            onEdit={() => {
              setEditingStudent(s);
              setOpen(true);
            }}
          />
        ))}
      </div>

      <StudentsForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        editingStudent={editingStudent}
      />
    </div>
  );
};

export default StudentsManage;
