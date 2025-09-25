import axios from "axios";
import type { Student } from "../types/type";
const API_URL = "http://localhost:8080/students";

export const getStudents = () => axios.get<Student[]>(API_URL);
export const addStudent = (student: Omit<Student, "id">) => axios.post<Student>(API_URL, student);
export const updateStudent = (student: Student) => axios.put<Student>(`${API_URL}/${student.id}`, student);
export const deleteStudent = (id: number) => axios.delete(`${API_URL}/${id}`);
