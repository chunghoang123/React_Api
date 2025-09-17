import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost, Post } from "../services/postService";

export default function EditPost(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id));
    }
  }, [id]);

  const fetchPost = async (postId: number) => {
    try {
      const res = await getPostById(postId);
      setPost(res.data);
    } catch (err) {
      console.error(err);
      alert("Không tìm thấy bài viết!");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    try {
      await updatePost(post.id!, post);
      alert("Cập nhật thành công!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại");
    }
  };

  if (loading) return <p className="p-5">Đang tải...</p>;

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa bài viết</h2>
      {post && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Tên bài viết"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={post.image}
            onChange={(e) => setPost({ ...post, image: e.target.value })}
            placeholder="Đường dẫn hình ảnh"
            className="border p-2 rounded"
          />
          <textarea
            value={post.content || ""}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder="Nội dung"
            className="border p-2 rounded"
            rows={6}
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 border rounded"
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Cập nhật
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
