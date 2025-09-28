import { useEffect, useState } from "react";
import { Button, Input, Select, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../hook/useReducer";
import type { Book } from "../interface/book.interface";
import { getBookDetail } from "../redux/slices/book.slices";
import { createBook, updateBook } from "../apis/book.apis";

const { Option } = Select;

export default function FormBook() {
  const dispatch = useAppDispatch();
  const { book, data } = useAppSelector((store) => store.book);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [year, setYear] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<string>("History");
  const [error, setError] = useState<string>("");

  // Khi bấm "Sửa"
  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setYear(book.year);
      setCategory(book.category || "History");
      setIsEdit(true);
      setIsModalOpen(true);
    }
  }, [book]);

  const showModal = () => {
    // reset form khi thêm mới
    setTitle("");
    setAuthor("");
    setYear(undefined);
    setCategory("History");
    setError("");
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setError("");
    dispatch(getBookDetail(null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Tiêu đề không được để trống!");
      return;
    }
    if (!author.trim()) {
      setError("Tác giả không được để trống!");
      return;
    }
    if (!year || year <= 0) {
      setError("Năm xuất bản phải hợp lệ!");
      return;
    }

    const isDuplicate = data.some(
      (b: Book) =>
        b.title?.toLowerCase() === title.trim().toLowerCase() &&
        b.id !== book?.id
    );
    if (isDuplicate) {
      setError("Sách đã tồn tại!");
      return;
    }

    const newBook: Book = {
      title: title.trim(),
      author: author.trim(),
      year,
      category,
    };

    if (isEdit && book) {
      dispatch(updateBook({ id: book.id || 0, ...newBook }));
    } else {
      dispatch(createBook(newBook));
    }

    setIsModalOpen(false);
    dispatch(getBookDetail(null));
  };

  return (
    <div className="p-4">
      <Button type="primary" onClick={showModal}>
        ADD BOOK
      </Button>

      <Modal
        title={isEdit ? "Edit Book" : "Add Book"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </div>

          <div>
            <label className="block mb-1">Author</label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
            />
          </div>

          <div>
            <label className="block mb-1">Year</label>
            <Input
              type="number"
              value={year ?? ""}
              onChange={(e) => setYear(Number(e.target.value))}
              placeholder="Year"
            />
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <Select
              value={category}
              onChange={(value) => setCategory(value)}
              className="w-full"
            >
              <Option value="History">History</Option>
              <Option value="Novel">Novel</Option>
              <Option value="Science">Science</Option>
            </Select>
          </div>

          {error && <span className="text-red-500 text-xs">{error}</span>}

          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={handleCancel}>CANCEL</Button>
            <Button type="primary" htmlType="submit">
              {isEdit ? "SAVE" : "ADD"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
