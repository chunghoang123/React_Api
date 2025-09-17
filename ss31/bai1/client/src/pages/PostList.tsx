import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, deletePost, blockPost, Post } from "../services/postService";

export default function PostList(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all"); // "all" | "published" | "blocked"
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy posts:", err);
      alert("Không lấy được danh sách bài viết. Kiểm tra server.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá?")) return;
    try {
      await deletePost(id);
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Xoá thất bại");
    }
  };

  const handleBlock = async (id: number, status: string) => {
    const newStatus = status === "Đã xuất bản" ? "Bị chặn" : "Đã xuất bản";
    try {
      await blockPost(id, newStatus);
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Thao tác thất bại");
    }
  };

  const filtered = posts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "published"
        ? p.status === "Đã xuất bản"
        : p.status === "Bị chặn";
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Quản lý bài viết</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Nhập từ khoá tìm kiếm"
            className="border p-2 rounded w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Lọc bài viết</option>
            <option value="published">Đã xuất bản</option>
            <option value="blocked">Bị chặn</option>
          </select>
        </div>

        <button
          onClick={() => navigate("/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm mới bài viết
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-center">STT</th>
              <th className="border p-3 text-left">Tiêu đề</th>
              <th className="border p-3 text-center">Hình ảnh</th>
              <th className="border p-3 text-center">Ngày viết</th>
              <th className="border p-3 text-center">Trạng thái</th>
              <th className="border p-3 text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post, idx) => (
              <tr
                key={post.id ?? idx}
                className={`text-center ${post.status === "Bị chặn" ? "bg-red-50" : ""}`}
              >
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2 text-left">{post.title}</td>
                <td className="border p-2">
                  <img
                    src={post.image || "https://via.placeholder.com/48"}
                    alt={post.title}
                    className="w-12 h-12 mx-auto rounded-full object-cover"
                  />
                </td>
                <td className="border p-2">{post.date}</td>
                <td className="border p-2">
                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      post.status === "Đã xuất bản"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="border p-2">
                  <button
                    className={`px-3 py-1 rounded text-sm ${
                      post.status === "Đã xuất bản"
                        ? "bg-orange-300 hover:bg-orange-400"
                        : "bg-green-400 hover:bg-green-500"
                    }`}
                    onClick={() => post.id && handleBlock(post.id, post.status)}
                  >
                    {post.status === "Đã xuất bản" ? "Chặn" : "Bỏ chặn"}
                  </button>

                  <button
                    className="ml-2 px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-sm"
                    onClick={() => post.id && navigate(`/edit/${post.id}`)}
                  >
                    Sửa
                  </button>

                  <button
                    className="ml-2 px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                    onClick={() => post.id && handleDelete(post.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Không có bài viết
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
