import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";

// Định nghĩa kiểu dữ liệu cho Student
interface Student {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
}

export default function StudentDetail() {
  async function getStudentById(id: number) {
    try {
      const response = await axios.get<Student>(`http://localhost:8080/student/${id}`);
      
      if (response.data) {
        console.log("Thông tin sinh viên:", response.data);
      } else {
        console.log("Không tìm thấy sinh viên");
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          console.log("Không tìm thấy sinh viên");
        } else {
          console.error("Lỗi khi gọi API:", axiosError.message);
        }
      } else {
        console.error("Lỗi không xác định:", error);
      }
    }
  }

  useEffect(() => {
    getStudentById(6); // thử với ID không tồn tại
  }, []);

  return (
    <div>
      Danh sách sinh viên trong console
    </div>
  );
}
