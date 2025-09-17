import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPost } from "../services/postService";

export default function AddPost(): JSX.Element {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Vui lòng nhập tiêu đề");
    try {
      await addPost({
        title,
        image,
        content,
        date: new Date().toISOString().split("T")[0],
        status: "Đã xuất bản"
      });
      alert("Thêm thành công");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm bài viết");
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Thêm mới bài viết</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tên bài viết"
          className="border p-2 rounded"
          required
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Đường dẫn hình ảnh"
          className="border p-2 rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nội dung"
          className="border p-2 rounded"
          rows={6}
        />
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={() => { setTitle(""); setImage(""); setContent(""); }}
            className="px-4 py-2 border rounded"
          >
            Làm mới
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Xuất bản
          </button>
        </div>
      </form>
    </div>
  );
}
