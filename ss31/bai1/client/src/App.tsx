import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostList from "./pages/PostList";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";

export default function App(): JSX.Element {
  return (
    <Router>
      <header className="p-4 bg-white shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-semibold">Quản lý bài viết</h1>
          <nav>
            <Link to="/" className="mr-4 text-blue-600">Danh sách</Link>
            <Link to="/add" className="text-blue-600">Thêm mới</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-6">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </main>
    </Router>
  );
}
