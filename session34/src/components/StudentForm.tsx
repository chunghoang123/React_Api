import {
  Button,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';

import React, { useEffect } from 'react';
import type { Student } from '../utils/types';
import { useAppDispatch } from '../hooks/useRedux';

interface StudentFormProps {
  onSubmit: (student: Student) => void;
  isRepairMode: boolean; 
  datarepair:Student
}

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
type FormChangeEvent = InputChangeEvent | SelectChangeEvent;

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, isRepairMode,datarepair }) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = React.useState<Student>({
    id: '',
    name: '',
    gender: 'Nam',
    birthday: '',
    hometown: '',
    address: '',
  });
   useEffect(() => {
  if (isRepairMode) {
    setForm(datarepair);
  }
}, [isRepairMode, datarepair]);
  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.id || !form.name) return;

   
    if (!isRepairMode) {
      dispatch({
        type: 'ADD',
        payload: form,
      });
      onSubmit(form);
    } else {
     
      dispatch({
        type: 'EDIT',
        payload: form,
      });
    }

    // reset form
    setForm({
      id: '',
      name: '',
      gender: 'Nam',
      birthday: '',
      hometown: '',
      address: '',
    });
  };

  return (
    <div className="w-1/3 p-4 border rounded-xl shadow">
      <h2 className="font-semibold mb-4">Thông Tin Sinh Viên</h2>
      <div className="flex flex-col gap-4">
        <TextField
          label="Mã sinh viên"
          name="id"
          value={form.id}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Tên sinh viên"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
        />
        <Select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="Nam">Nam</MenuItem>
          <MenuItem value="Nữ">Nữ</MenuItem>
        </Select>
        <TextField
          type="date"
          label="Ngày sinh"
          name="birthday"
          value={form.birthday}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Nơi sinh"
          name="hometown"
          value={form.hometown}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Địa chỉ"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {isRepairMode ? 'Update' : 'Submit'}
        </Button>
      </div>
    </div>
  );
};

export default StudentForm;
