import type { Student } from '../utils/types';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import Toolbar from '../components/Toolbar';
import { useState } from 'react';

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 'SV001', name: 'Nguyễn Văn A', gender: 'Nam' },
    { id: 'SV002', name: 'Nguyễn Văn B', gender: 'Nữ' },
    { id: 'SV003', name: 'Nguyễn Văn C', gender: 'Nam' },
  ]);
  const [strepair,setStrepair] =useState<Student>({
    id: '',
    name: '',
    gender: 'Nam',
    birthday: '',
    hometown: '',
    address: '',
  })
  const [isRepair, setIsRepair] = useState<boolean>(false);


  const handleAddStudent = (student: Student) => {
    setStudents([...students, student]);
  };


  const handleRepair = () => {
    setIsRepair(true);
  };
  const contextRepair=(st:Student)=>{
       setStrepair(st);
  }
 
  const handleSearch = (keyword: string) => {
    setStudents((prev) =>
      prev.filter((s) => s.name?.toLowerCase().includes(keyword.toLowerCase())),
    );
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        <Toolbar onSearch={handleSearch} />
        <StudentList  onRepair={handleRepair} st={contextRepair}/>
      </div>
      <StudentForm onSubmit={handleAddStudent} isRepairMode={isRepair} datarepair={strepair}/>
    </div>
  );
};

export default StudentManagement;
