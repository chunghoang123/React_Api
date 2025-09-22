import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import type { Student } from '../utils/types';

interface StudentListProps {
  st:(s:Student)=>void;
  onRepair: () => void;
}
const StudentList: React.FC<StudentListProps> = ({ onRepair,st}) => {
  const dispatch = useAppDispatch();
  const { student } = useAppSelector((store) => store);
  const handlerepair=(id:string)=>{
    onRepair();
    const news=student.find(e=>e.id==id);
    if(!news) return;
    st(news);
  }
  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE', payload: { id } });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Mã sinh viên</TableCell>
            <TableCell>Tên sinh viên</TableCell>
            <TableCell>Giới tính</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {student.map((s, i) => (
            <TableRow key={s.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{s.id}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.gender}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="contained" color="error">
                    Xem
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={()=>handlerepair(s.id || '')}
                  >
                    Sửa
                  </Button>
                  <Button
                    onClick={() => handleDelete(s.id || '')}
                    variant="contained"
                    color="success"
                  >
                    Xóa
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentList;
