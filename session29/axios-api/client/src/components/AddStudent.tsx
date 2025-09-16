import React, { useEffect } from "react";
import axios from "axios";

interface Student {
  id?: number; // id có thể để server tự tạo
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
}

export default function AddStudent() {
  async function createStudent() {
    const newStudent: Student = {
      student_name: "Nguyen Van C",
      email: "c@example.com",
      address: "Da Nang",
      phone: "0987654321",
      status: true,
      created_at: new Date().toISOString(), 
    };

    try {
      const response = await axios.post<Student>(
        "http://localhost:8080/student",
        newStudent
      );
      console.log("Kết quả server trả về:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Lỗi khi gọi API:", error.message);
      } else {
        console.error("Lỗi không xác định:", error);
      }
    }
  }

  useEffect(() => {
    createStudent(); // Gọi hàm khi component mount
  }, []);

  return (
    <div>
      <h2>Thêm sinh viên mới</h2>
      <p>Xem kết quả trong console.</p>
    </div>
  );
}
