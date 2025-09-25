import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { type Student } from "../types/type";

interface StudentsFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (student: Omit<Student, "id"> | Student) => void;
  editingStudent?: Student | null;
}

const StudentsForm: React.FC<StudentsFormProps> = ({
  open,
  onClose,
  onSubmit,
  editingStudent,
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | string>("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setAge(editingStudent.age);
      setGrade(editingStudent.grade);
    } else {
      setName("");
      setAge("");
      setGrade("");
    }
  }, [editingStudent]);

  const handleSubmit = () => {
    if (!name || !age || !grade) return alert("Vui lòng nhập đầy đủ thông tin");

    onSubmit({
      ...(editingStudent ? { id: editingStudent.id } : {}),
      name,
      age: Number(age),
      grade,
    } as Student);

    // ✅ Reset toàn bộ input sau khi submit
    setName("");
    setAge("");
    setGrade("");

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editingStudent ? "Sửa thông tin sinh viên" : "Thêm sinh viên mới"}
      </DialogTitle>
      <DialogContent className="space-y-4 mt-2">
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}

        />
        <TextField
          fullWidth
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          fullWidth
          label="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          sx={{ mb: 2 }}

        >
          <MenuItem value="10A1">10A1</MenuItem>
          <MenuItem value="10A2">10A2</MenuItem>
          <MenuItem value="11B1">11B1</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {editingStudent ? "Cập nhật" : "Thêm mới"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentsForm;
