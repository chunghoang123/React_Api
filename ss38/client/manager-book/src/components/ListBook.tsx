import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook/useReducer";
import type { Book } from "../interface/book.interface";
import { deleteBook, getAllBook } from "../apis/book.apis";
import { getBookDetail } from "../redux/slices/book.slices";

export default function ListBook() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book>();

  const { data: book, error, status } = useAppSelector((store) => store.book);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBook(""));
  }, [dispatch]);

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book);
    setIsDeleteOpen(true);
  };

  const handleOkDelete = () => {
    if (bookToDelete?.id) {
      dispatch(deleteBook(bookToDelete.id));
    }
    setIsDeleteOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteOpen(false);
  };

  if (error) {
    return (
      <h1 className="flex justify-center mt-5">
        Đã có lỗi xảy ra. Vui lòng kiểm tra lại
      </h1>
    );
  }

  return (
    <div>
      {/* Loading overlay */}
      {status === "pending" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 65, color: "#5d9fdf" }}
                spin
              />
            }
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-6">
        {status === "success" && book.length === 0 ? (
          <div className="flex justify-center">
            <div className="ml-[300px] text-center text-gray-500">
              No books found
            </div>
          </div>
        ) : (
          status === "success" &&
          book.map((b) => (
            <div
              key={b.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{b.title}</p>
                <p className="text-gray-500 text-sm">
                  {b.author} • {b.year} • {b.category}
                </p>
              </div>
              <div className="flex gap-2">
                <EditOutlined
                  className="cursor-pointer text-blue-500"
                  onClick={() => dispatch(getBookDetail(b))}
                />
                <DeleteOutlined
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDeleteClick(b)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal xác nhận */}
      <Modal
        className="!w-[400px]"
        title="Xác nhận"
        open={isDeleteOpen}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <div className="flex items-center gap-3">
          <ExclamationCircleOutlined className="!text-red-500 text-2xl" />
          <p>Bạn có chắc chắn muốn xoá sách này không?</p>
        </div>
      </Modal>
    </div>
  );
}
