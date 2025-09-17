import axios from "axios";

export interface Post {
  id?: number;
  title: string;
  image: string;
  date: string;
  status: string; // "Đã xuất bản" | "Bị chặn"
  content?: string;
}

const API_URL = "http://localhost:5000/posts";

export const getPosts = () => axios.get<Post[]>(API_URL);
export const getPostById = (id: number) => axios.get<Post>(`${API_URL}/${id}`);
export const addPost = (post: Omit<Post, "id">) => axios.post<Post>(API_URL, post);
export const updatePost = (id: number, post: Partial<Post>) =>
  axios.put<Post>(`${API_URL}/${id}`, post);
export const deletePost = (id: number) => axios.delete(`${API_URL}/${id}`);
export const blockPost = (id: number, status: string) =>
  axios.patch<Post>(`${API_URL}/${id}`, { status });

